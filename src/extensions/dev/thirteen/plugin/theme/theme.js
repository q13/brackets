/**
 * 主题插件
 */

/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";

    var Menus = brackets.getModule("command/Menus"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
        prefs = PreferencesManager.getExtensionPrefs("thirteen"),
        CommandManager = brackets.getModule("command/CommandManager");

    //设置preference data
    prefs.definePreference("openTheme", "boolean", false).on("change", function (e, data) {
        //console.log("Possibly changed prefs:", data.ids);
        if (prefs.get('openTheme')) {
            appendTheme();
            CommandManager.get("thirteen-theme").setChecked(true);
        } else {
            removeTheme();
            CommandManager.get("thirteen-theme").setChecked(false);
        }
    });

    function appendTheme() {
        var bodyEl = $('body'),
            editorHolderEl = $('#editor-holder'),
            titleBarEl = $('#titlebar', bodyEl);

        bodyEl.append('<link id="thirteen-theme" rel="stylesheet" type="text/css" href="' + ExtensionUtils.getModulePath(module, '') + 'theme.css" />');
        bodyEl.append('<script src="http://use.edgefonts.net/dancing-script.js"></script>');
        editorHolderEl.prepend('<div class="editor-bg"><span class="icon-avatar"></span></div>');
        //alert($('#editor-holder').length);

        //附属html元素
        $('<div class="thirteen-theme-logo">13&#8217;s editor</div>').prependTo(titleBarEl);
    }
    function removeTheme() {
        var bodyEl = $('body'),
            titleBarEl = $('#titlebar', bodyEl);

        $('#thirteen-theme').remove();
        $('.thirteen-theme-logo', titleBarEl).remove();
    }
    /**
     * 初始化入口
     * @param {Type}
     */
    function init() {
        var mainMenu = Menus.getMenu('thirteen');
        //构建子命令菜单
        var command = "thirteen-theme";
        CommandManager.register('Theme', command, function () {
            if (prefs.get("openTheme")) {
                prefs.set("openTheme", false);

            } else {
                prefs.set("openTheme", true);

            }
            prefs.save();
        });
        //mainMenu.addMenuDivider();
        mainMenu.addMenuItem(command);
    }
    exports.init = init;
});
