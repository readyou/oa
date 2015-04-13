var netproj = {};

netproj.list = ["序号","工单号","甲方项目负责人","乙方项目负责人","项目属性","项目类别","实施原因","项目名称","工程地址","所属区域","施工队","施工队负责人","委托时间","立项情况","开工时间","完工时间","竣工图纸收到日期（附件）","甲方验收情况","送审日期（附件）","备注"
	,"预算","结算","开票金额（附件）","实际收款","施工队结款","施工队工作量表格","其他费用","利润","备注"];

netproj.selectOptions = {};

//项目属性
netproj.selectOptions.propertiesList = ['管道','光缆','设备','客户端'];

//所属区域
netproj.selectOptions.areaList = ['黄浦','卢湾','徐汇','长宁','静安','普陀',
	'闸北','虹口','杨浦','宝山','嘉定','浦东新区','松江','金山',
	'青浦','南汇','奉贤','崇明'];

//施工队
netproj.selectOptions.constrctteamList = ['中邮通','中移','邮电','广越','东冠','和勤','电信','久豪','贝电','海润','中通二局','翔发',
	'辉程','龙盛','明嬴','盛脉','通福','万程','信辰','远鹰','阅龙','置诚','兆康','兴霸','和联','鸿维','嘉正','炜晟','新周',
	'信潮','众托','共联','中福','长安','都顺','联音','商美','英得','亚通','邮顺','渝华','忠吕','中铁','天达','虹鹰','兴和',
	'云沪','雨花','晟平','秦禧','立天','中通一局','博索','富悦','廉创','润风','海剑','宏晋','米赛','伟琳','骥通','北京工程局',
	'景合','海缆','煜菱','鸿达'];

//立项情况
netproj.selectOptions.situationList = ['未开工','在建','完工','受阻','无法实施','传输已达','地址错误'];

module.exports = netproj;