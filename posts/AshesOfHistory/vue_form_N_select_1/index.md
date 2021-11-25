<!--
 * @Author: 沧澜
 * @Date: 2021-11-24 11:35:14
 * @LastEditors: 沧澜
 * @LastEditTime: 2021-11-24 11:39:50
 * @Description:
-->

# Vue 表单 N 选一逻辑实现及其优化点

项目中我们经常会遇到表单的联合校验的功能。

比如表单中有电话号码和手机号码两个选项，两个必须选填一个。表单提交的时候需要校验两者的合并方式。

如果这种必填的选项有 N 个呢？

我们是不是可以封装一个 N 选 1 的抽象逻辑出来呢？

于是就有了这样一版初稿。

效果是 name，resouce，desc 三个字段必填一项，如果三个都不填，则必须选择一项。

首先是寻找必填的选项，我的判定方式是，按照传递的数组的顺序找到第一个存在的选项。

找到对应的表单字段下规则数组中带有 required 的选项的规则，将其 required 改为对应的状态，其余内容不变。

当然这样做在 watch 中监听每次都会触发这个方法，可以加个条件，仅当传入的字段数组中的值发生改变的时候，才进行处理。

还可以通过节防抖的方法，减少表单输入的时候的触发次数。

具体的 demo 代码就在下面啦。👇

当然我们也可以封装一个自定义指令的方式，把这个方法封装成 v-arrRequired 的自定义指令，实现这个功能，以便最小化的影响原来的代码逻辑。

```js
<template>
  <div class="home">
    home 页面
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: false, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    singleChoose(rules, chosenRules, isMultiple) {
      // 是否支持多选    是否支持单选    抽象封装一个表单校验规则组件。
      // 如何自动指定必填的选项

      let currentRequireName = chosenRules[0];
      let hasInitFlag = false;

      // 表单控件  二选一必填
      for (let key in rules) {
        chosenRules.forEach((item) => {
          if (item === key) {
            if (!hasInitFlag) {
              hasInitFlag = true;
              currentRequireName = key;
            }
            rules[key].find((item) => item.required);
          }
        });
      }
    },

    getCurrentRuleName({ rules = {}, chosonRuleNames = [], oldForm = {} }) {
      let flag = false;
      let currentRuleName = chosonRuleNames[0];
      for (let chosenRuleIndex in chosonRuleNames) {
        if (flag) {
          break;
        }
        if (oldForm[chosonRuleNames[chosenRuleIndex]] && !flag) {
          currentRuleName = chosonRuleNames[chosenRuleIndex];
          flag = true;
        }
      }
      console.log("currentRuleName", currentRuleName);
      // 找到对应的表单字段下规则数组中带有required的选项的规则，将其required改为对应的状态，其余内容不变
      chosonRuleNames.forEach((item, index) => {
        if (item === currentRuleName) {
          let findItem = rules[currentRuleName].find((oldRuleItem) =>
            oldRuleItem.hasOwnProperty("required")
          );
          findItem.required = true;
          chosonRuleNames.forEach((filterItem, filterIndex) => {
            if (filterIndex !== index) {
              let findFilterItem = rules[filterItem].find((filterRuleItem) =>
                filterRuleItem.hasOwnProperty("required")
              );
              findFilterItem.required = false;
            }
          });
        }
      });
    },
  },
  mounted() {
    this.singleChoose(this.rules, ["resource", "desc"], false);
  },
  watch: {
    ruleForm: {
      handler(oldForm, curForm) {
        console.log(oldForm, curForm, oldForm.name === curForm.name);
        this.getCurrentRuleName({
          rules: this.rules,
          chosonRuleNames: ["name", "resource", "desc"],
          oldForm,
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

```
