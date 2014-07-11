/**
 * 项目预处理
 */

/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";

    var FileSystem = brackets.getModule("filesystem/FileSystem"),
        AppInit = brackets.getModule("utils/AppInit"),
        ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
        ProjectManager = brackets.getModule("project/ProjectManager");

    var configFileNdame = ".jshintrc";
    /**
     * 缺省jshint配置文件自动生成
     * @param {Type}
     */
    function initJsHintConfig() {
        AppInit.appReady(function() {
            var projectRootEntry = ProjectManager.getProjectRoot(),
                file = FileSystem.getFileForPath(projectRootEntry.fullPath + configFileNdame);
            file.read(function (err, content) {
                var configFile;
                if (err) {
                    configFile = FileSystem.getFileForPath(ExtensionUtils.getModulePath(module, '') + '/config.json');
                    configFile.read(function (err, content) {
                        if (!err) {
                            file.write(content);
                        }
                    });
                }
            });
        });
    }

    /**
     * 初始化入口
     * @param {Type}
     */
    function init() {
        initJsHintConfig();
    }
    exports.init = init;
});
