/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...
// 定义原始值
var ddd=1
var initialData=[
    {
        title: '吃饭',
        done: false
    },
    {
        title: '睡觉',
        done: false
    },
    {
        title: '打豆豆',
        done: false
    },
    {
        title: '喝酒',
        done: true
    },
    {
        title: '蹦迪',
        done: true
    }
]
localStorage.setItem("todolist", JSON.stringify(initialData));
initData()
function initData(){
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
        if ($(this).val() == "") {
            alert("输入内容不能为空！");
        } else if($(this).val() == !/[^\s]/.test($(this).val())){
            alert("输入内容不能为空格！")
        } else {
            // 先读取本地存储原来的数据
            var local = getDate();
            console.log($(this).val())
            local.push({
                title: $(this).val(),
                done: false
            });
            saveDate(local);
            load();
            $(this).val("");
        }
        }
    });
    $("ol, ul").on("click", "a", function () {
        var data = getDate();
        console.log(data);
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        saveDate(data);
        load();
    });
    
    // 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function () {
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);
        saveDate(data);
        // 重新渲染页面
        load();
    });
    
    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
        // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    
    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    
    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function (i, n) {
        // console.log(n);
        if (n.done) {
            $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
            doneCount++;
        } else {
            $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
            todoCount++;
        }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
}