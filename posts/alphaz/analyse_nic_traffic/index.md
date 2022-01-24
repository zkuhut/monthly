## Linux sar分析网卡流量

##### CentOS：

yum install sysstat

sar -n { DEV | EDEV | NFS | NFSD | SOCK | ALL }

sar 提供六种不同的语法选项来显示网络信息。-n选项使用6个不同的开关：DEV | EDEV | NFS | NFSD | SOCK | ALL 。DEV显示网络接口信息，EDEV显示关于网络错误的统计数据，NFS统计活动的NFS客户端的信息，NFSD统计NFS服务器的信息，SOCK显示套接字信息，ALL显示所有5个开关。它们可以单独或者一起使用。

#sar -n DEV 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain) 03/29/2009

01:39:40 AM IFACE rxpck/s txpck/s rxbyt/s txbyt/s rxcmp/s txcmp/s rxmcst/s
01:39:42 AM lo 0.00 0.00 0.00 0.00 0.00 0.00 0.00
01:39:42 AM eth1 131.34 104.98 119704.48 36110.45 0.00 0.00 0.00
01:39:42 AM sit0 0.00 0.00 0.00 0.00 0.00 0.00 0.00

01:39:42 AM IFACE rxpck/s txpck/s rxbyt/s txbyt/s rxcmp/s txcmp/s rxmcst/s
01:39:44 AM lo 0.00 0.00 0.00 0.00 0.00 0.00 0.00
01:39:44 AM eth1 168.00 165.50 114496.50 83938.50 0.00 0.00 0.00
01:39:44 AM sit0 0.00 0.00 0.00 0.00 0.00 0.00 0.00

IFACE：LAN接口

rxpck/s：每秒钟接收的数据包
txpck/s：每秒钟发送的数据包
rxbyt/s：每秒钟接收的字节数
txbyt/s：每秒钟发送的字节数
rxcmp/s：每秒钟接收的压缩数据包
txcmp/s：每秒钟发送的压缩数据包
rxmcst/s：每秒钟接收的多播数据包

#sar -n EDEV 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain) 03/29/2009

01:42:18 AM IFACE rxerr/s txerr/s coll/s rxdrop/s txdrop/s txcarr/s rxfram/s rxfifo/s txfifo/s
01:42:20 AM lo 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00
01:42:20 AM eth1 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00
01:42:20 AM sit0 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00 0.00

IFACE：LAN接口
rxerr/s：每秒钟接收的坏数据包

txerr/s：每秒钟发送的坏数据包

coll/s：每秒冲突数
rxdrop/s：因为缓冲充满，每秒钟丢弃的已接收数据包数
txdrop/s：因为缓冲充满，每秒钟丢弃的已发送数据包数
txcarr/s：发送数据包时，每秒载波错误数
rxfram/s：每秒接收数据包的帧对齐错误数
rxfifo/s：接收的数据包每秒FIFO过速的错误数
txfifo/s：发送的数据包每秒FIFO过速的错误数

#sar -n SOCK 2 10
Linux 2.6.18-53.el5PAE (localhost.localdomain) 03/29/2009

01:44:32 AM totsck tcpsck udpsck rawsck ip-frag
01:44:34 AM 243 9 8 0 0
01:44:36 AM 242 9 7 0 0
01:44:38 AM 238 9 7 0 0
01:44:40 AM 238 9 7 0 0

totsck:使用的套接字总数量
tcpsck:使用的TCP套接字数量
udpsck:使用的UDP套接字数量

rawsck:使用的raw套接字数量
ip-frag:使用的IP段数量