"ui";
/**
 * 此UI之前用于C/S架构的脚本管理,脚本中 可能有一些逻辑性的bug,和有些用户体验上的问题.
 * 按照一般用户的使用习惯,整个流程应该没有什么大问题,没时间搞了,需要去学习一段时间.
 * 如果有人愿意更新一些其他功能,欢迎在此基础上进行补充.
 * 
 * 一些简单的说明:
 *      脚本用到了服务器,需要自己搭建环境.纯静态的即可,有能力的可以自己写接口.
 *      脚本版本号的验证 需要写在脚本文件的首行 例子: //version:0.0.1
 * 
 *      服务器端需要有一个json文件来控制UI中的脚本列表, json文件示例:
 * 
 *                          列表显示名|本地文件夹名称|服务端脚本文件名|版本号
 *      {
 *          "script_001" : "AutoJs Say Hello|HelloWorld|main_Hello.js|0.0.1",
 *      }
 */
var color = "#4C484C";
var frameColor = "#7E787F";
var textColor = "#CCCCCC";
var img_scriptIconColor = "#007E787F";
var img_refreshIconColor = "#FFFFFF";


//indexOf的替代函数 contains();
const contains = (() =>
    Array.prototype.includes
        ? (arr, value) => arr.includes(value)
        : (arr, value) => arr.some(el => el === value)
)();

//保存脚本文件列表的数组
var scriptInfo = [];

ui.statusBarColor("#4C484C");
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar background="{{color}}">
                <linear>
                    <toolbar id="toolbar" title="脚本管理平台" />
                </linear>
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager" background="{{frameColor}}">
                <frame> {/** 第一屏布局*/}
                    <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                        <text text="基础设置" textSize="12sp" textColor="{{textColor}}" />
                    </linear>
                    {/* 分割线填充 */}
                    <vertical w="*" h="1" bg="{{color}}" ></vertical>
                    <vertical>
                        <button id="btn_start2" text="开始22运行"> </button>
                        <button id="btn_start" text="开始运行"> </button>
                    </vertical>
                </frame>

                <frame> {/** 第二屏布局*/}
                    <vertical>
                        <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                            <text text="基础设置" textSize="12sp" textColor="{{textColor}}" />
                        </linear>

                        <linear h="40" paddingTop="10">
                            <linear w="*" margin="0 20 0 20" layout_gravity="center" >
                                {/* 微信号 Text控件 */}
                                <linear layout_weight="1" gravity="center" h="*">
                                    <text text="微信号:"
                                        color="{{textColor}}"
                                        size="16sp"
                                    />
                                </linear>

                                {/* 微信号输入框控件 */}
                                <linear layout_weight="3" h="*">
                                    <input id="wechaNum"
                                        inputType="textVisiblePassword"
                                        padding="0 5 0 5"
                                        singleLine="true"
                                        h="30"
                                        w="*"
                                        textColor="#E1E4E5"
                                        textSize="14sp"
                                        textCursorDrawable="@null"
                                        hint="为空则不发送"
                                        bg="#f1bbbbbb"
                                        layout_gravity="left|center" />
                                </linear>

                                {/* 执行次数 Text控件 */}
                                <linear layout_weight="1" gravity="center" h="*">
                                    <text text="次数:"
                                        marginLeft="1"
                                        marginRight="1"
                                        color="{{textColor}}"
                                        size="16sp"
                                    />
                                </linear>

                                {/* 执行次数输入框控件 */}
                                <linear layout_weight="2" h="*">
                                    <input id="Loops"
                                        inputType="number"
                                        padding="0 5 0 5"
                                        singleLine="true"
                                        h="30"
                                        w="*"
                                        textColor="#E1E4E5"
                                        textSize="14sp"
                                        textCursorDrawable="@null"
                                        hint="1"
                                        bg="#f1bbbbbb"
                                        layout_gravity="left|center" />
                                </linear>
                            </linear>
                        </linear>

                        <vertical>
                            <linear w="*" h="40" margin="0 20 0 20" >
                                <linear layout_weight="1" h="30" layout_gravity="left|center" >
                                    {/* 脚本速度 Text控件 */}
                                    <linear gravity="right|center" w="80" h="*">
                                        <text text="当前速度: "
                                            textColor="{{textColor}}"
                                            marginBottom="1"
                                            textSize="16sp" />
                                    </linear>

                                    {/* 当前速度值 Text控件 */}
                                    <linear gravity="center" w="30" h="*">
                                        <text id="speedtext"
                                            text=""
                                            textColor="{{textColor}}"
                                            textSize="14sp"
                                            textStyle="bold" />
                                    </linear>
                                </linear>
                            </linear>

                            <linear w="*" h="24" margin="0 20 0 20" gravity="center" >
                                {/** 慢 Text控件 */}
                                <linear layout_weight="1" gravity="right" >
                                    <text text="慢"
                                        textColor="{{textColor}}"
                                        textSize="14sp" />
                                </linear>

                                {/** 进度条控件 */}
                                <linear layout_weight="8" >
                                    <seekbar id="speed"
                                        max="99"
                                        progress="79"
                                        bg="#00bbbbbb"
                                        w="*" />
                                </linear>

                                {/** 快 Text控件 */}
                                <linear layout_weight="1" gravity="left" >
                                    <text text="快"
                                        textColor="{{textColor}}"
                                        textSize="14sp" />
                                </linear>
                            </linear>
                        </vertical>

                        {/* 分割线填充 */}
                        <vertical w="*" h="1" bg="{{color}}" ></vertical>

                        {/* 其他功能区域相关配置 */}
                        <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                            <text text="附加功能" textSize="12sp" textColor="{{textColor}}" />
                        </linear>
                        <vertical margin="0 20 0 20">
                            {/* <linear layout_weight="1" >
                                <checkbox id="str" text="脚本运行前开启录屏(功能未开发)" color="{{textColor}}" />
                            </linear> */}
                            <linear layout_weight="1" >
                                <checkbox id="sendMsgOption" text="脚本出错时发送相关日志给开发者(需安装QQ)" color="{{textColor}}" />
                            </linear>
                        </vertical>

                        {/* 分割线填充 */}
                        <vertical w="*" h="1" bg="{{color}}" ></vertical>

                        {/* 垃圾清理区域相关配置 */}
                        <linear w="*" h="24" paddingLeft="8" gravity="left|center" >
                            <text text="清理相关" textSize="12sp" textColor="{{textColor}}" />
                        </linear>
                        <vertical>
                            <linear w="*" h="50" margin="0 20 0 20" gravity="center" >
                                <linear layout_weight="1" >
                                    <checkbox id="clear_log" text="日志" color="{{textColor}}" />
                                </linear>
                                <linear layout_weight="1" >
                                    <checkbox id="clear_namelist" text="已聊名单" color="{{textColor}}" />
                                </linear>
                                <linear layout_weight="1" >
                                    <checkbox id="clear_config" text="配置文件" color="{{textColor}}" />
                                </linear>
                                <linear layout_weight="1" gravity="right" >
                                    <button id="clear_Btn" text="删除" w="60" h="40" />
                                </linear>
                            </linear>

                        </vertical>

                        {/* 分割线填充 */}
                        <vertical w="*" h="1" bg="{{color}}" ></vertical>

                        {/* <linear gravity="center" margin="0 0 0 0">
                            <button id="reset" w="85" h="40" style="Widget.AppCompat.Button.Colored" bg="#E1E4E5" textSize="16sp" textStyle="bold" textColor="#000000" text="清除缓存" margin="12"></button>
                            <button id="start" w="85" h="40" style="Widget.AppCompat.Button.Colored" bg="#3CCA3C" textSize="16sp" textStyle="bold" textColor="#FFFFFF" text="开  始" margin="12"></button>
                        </linear> */}
                    </vertical>
                </frame>

                <frame> {/** 第三屏布局*/}
                    <text text="暂时还没想好内容" textColor="{{textColor}}" textSize="16sp" />
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);


// ui.noData.setVisibility(View.GONE);
//设置滑动页面的标题
ui.viewpager.setTitles(["脚本列表", "相关设置", "关于"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);