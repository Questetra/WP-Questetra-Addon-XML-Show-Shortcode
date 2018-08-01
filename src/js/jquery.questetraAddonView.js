(function($) {
    $.fn.questetraAddonView = function(method) {
        var methods = {
            init: function(options) {
                var settings = $.extend({
                        locale: null,
                        label: ".addon-xml-label",
                        summary: ".addon-xml-summary",
                        help: ".addon-xml-help",
                        config: ".addon-xml-config",
                        configTable: ".addon-xml-config-table",
                        script: ".addon-xml-script",
                        icon: ".addon-xml-icon",
                        download: ".addon-xml-download",
                        requiredLabel: {
                            en: "required",
                            ja: "必須"
                        },
                        formTypeLabel: {
                            en: {
                                TEXTFIELD: "Single-line input",
                                TEXTAREA: "Multi-line input",
                                SELECT: "Data select"
                            },
                            ja: {
                                TEXTFIELD: "単一行記述",
                                TEXTAREA: "複数行記述",
                                SELECT: "データ項目選択"
                            }
                        },
                        dataTypeLabel: {
                            en: {
                                STRING: "String",
                                STRING_TEXTFIELD: "String(single line)",
                                STRING_TEXTAREA: "String(multiple line)",
                                DECIMAL: "Numeric",
                                DATE: "Date",
                                DATETIME: "Datetime",
                                SELECT: "Select",
                                SELECT_SINGLE: "Select(radio/select/search)",
                                SELECT_CHECKBOX: "Select(check box)",
                                QUSER: "User",
                                QGROUP: "Organization",
                                LIST: "Table",
                                FILE: "File",
                                DISCUSSION: "Discussion"
                            },
                            ja: {
                                STRING: "文字列型",
                                STRING_TEXTFIELD: "文字列型（単一行）",
                                STRING_TEXTAREA: "文字列型（複数行）",
                                DECIMAL: "数値型",
                                DATE: "日付型",
                                DATETIME: "日時型",
                                SELECT: "選択型",
                                SELECT_SINGLE: "選択型（ラジオ/セレクト/検索）",
                                SELECT_CHECKBOX: "選択型（チェックボックス）",
                                QUSER: "ユーザ型",
                                QGROUP: "組織型",
                                LIST: "テーブル型",
                                FILE: "ファイル型",
                                DISCUSSION: "掲示板型"
                            }
                        },
                        enableEl: {
                            en: "Inserting EL expressions is also possible",
                            ja: "EL式挿入も可"
                        },
                        class: {
                            prefix: "questetra-addon-xml-viewer",
                                status: {
                                    wait: "loader-status-wait",
                                    loading: "loader-status-loading",
                                    loaded: "loader-status-loaded"
                                },
                                label: "label",
                                summary: "summary",
                                required: "required",
                                el: "el",
                                help: "help",
                                script: "script",
                                config: "config",
                                configRow: "row",
                                configRowItem: "item",
                                formType: "formtype",
                                dataTypes: "datatypes",
                                dataType: "datatype"
                        }
                    },
                    options
                );

                var dataLang = $(this).data('addon-xml-lang');

                if (dataLang && dataLang.length > 0 && dataLang !== "en") {
                    settings.locale = dataLang;
                }

                $(this).addClass(settings.class.prefix);
                $(this).addClass(
                    settings.class.prefix + "-" + settings.class.status.wait
                );
                $('.questetra-addon-xml-viewer-loader-status-wait-view').show();

                $(this).data("addon-setting", settings);

                methods.show.apply(this, []);

                return this;
            },
            _loadSrc: function(callback) {
                var me = this;
                var url = $(this).data("addon-xml-src");
                var addonSetting = $(this).data("addon-setting");

                if (url) {
                    $(addonSetting.download).attr({
                        "href": url
                    });

                    $(this).data("addon-status", "loading");
                    $(this).removeClass(
                        addonSetting.class.prefix + "-" + addonSetting.class.status.wait
                    );
                    $('.questetra-addon-xml-viewer-loader-status-wait-view').hide();
                    $(this).addClass(
                        addonSetting.class.prefix + "-" + addonSetting.class.status.loading
                    );
                    $('.questetra-addon-xml-viewer-loader-status-loading-view').show();
                    $.ajax(url, {
                            type: "get",
                            data: { query: $("#keyword").val() },
                            dataType: "xml"
                        })
                        .done(function(data) {
                            $(me).data("addon-src", data);
                            $(me).data("addon-status", "loaded");
                            $(me).removeClass(
                                addonSetting.class.prefix +
                                "-" +
                                addonSetting.class.status.loading
                            );
                            $(me).addClass(
                                addonSetting.class.prefix +
                                "-" +
                                addonSetting.class.status.loaded
                            );
                            $('.questetra-addon-xml-viewer-loader-status-loading-view').hide();
                            $('.questetra-addon-xml-viewer-loader-status-loaded-view').show();
                            methods[callback].apply(me, []);
                        })
                        .fail(function() {
                            window.alert("正しい結果を得られませんでした。");
                        });
                }
            },
            show: function() {
                var src = $(this).data("addon-src");
                if (src) {
                    methods._showLabel.apply(this, []);
                    methods._showSummary.apply(this, []);
                    methods._showScript.apply(this, []);
                    methods._showConfig.apply(this, []);
                    methods._showConfigTable.apply(this, []);
                    methods._showIcon.apply(this, []);
                    methods._showHelpUrl.apply(this, []);
                } else {
                    methods._loadSrc.apply(this, ["show"]);
                }
            },
            _getLocale: function(_default) {
                var addonSetting = $(this).data("addon-setting");
                var locale = addonSetting.locale;
                if (locale) {
                    return locale;
                }
                return _default;
            },
            _getLocaleSelector: function() {
                var locale = methods._getLocale.apply(this, [null]);
                if (locale) {
                    return "[locale='" + locale + "']";
                }
                return "";
            },
            _showLabel: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var locale = methods._getLocaleSelector.apply(this, []);
                    var label = $(src)
                        .find("service-task-definition > label" + locale)
                        .html();
                    $(addonSetting.label)
                        .html(label)
                        .addClass(
                            addonSetting.class.prefix + "-" + addonSetting.class.label
                        );
                }
            },
            _showSummary: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var locale = methods._getLocaleSelector.apply(this, []);
                    var summary = $(src)
                        .find("service-task-definition > summary" + locale)
                        .html();

                    //console.log('summary', summary);

                    $(addonSetting.summary)
                        .html(summary)
                        .addClass(
                            addonSetting.class.prefix + "-" + addonSetting.class.summary
                        );
                }
            },
            _showHelpUrl: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var locale = methods._getLocaleSelector.apply(this, []);
                    var helpUrl = $(src)
                        .find("service-task-definition > help-page-url" + locale)
                        .html();
                    $(addonSetting.help)
                        .attr("href", helpUrl)
                        .addClass(
                            addonSetting.class.prefix + "-" + addonSetting.class.help
                        );
                } else {
                    // 設定が無いなら消す
                    $(addonSetting.help).hide();
                }
            },
            _showScript: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var script = $(src)
                        .find("script")
                        .html();
                    script = script.replace(/<\!\[CDATA\[\n*|\n*\]\]>/g, "");
                    //console.log(script);
                    $(addonSetting.script)
                        .text(script)
                        .addClass(
                            addonSetting.class.prefix + "-" + addonSetting.class.script
                        );
                }
            },
            _showConfigTable: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var $config = $(src).find(
                        "service-task-definition > configs > config"
                    );
                    var locale = methods._getLocaleSelector.apply(this, []);
                    var localeCode = methods._getLocale.apply(this, ["en"]);

                    var res = "";

                    $config.each(function(index, val) {

                        var label = $(this)
                            .find("label" + locale)
                            .html();
                        if (!label) {
                            label = $(this)
                                .find("label")
                                .html();
                        }

                        var name = $(this).attr('name');
                        res += '<tr class="' + addonSetting.class.prefix + '-' + addonSetting.class.config + '-table-low">';
                        res += '<th class="' + addonSetting.class.prefix + '-' + addonSetting.class.config + '-table-low-name">' + name + '</th>';
                        res += '<td class="' + addonSetting.class.prefix + '-' + addonSetting.class.config + '-table-low-label">' + label + '</td>';
                        res += '</tr>';
                    });

                    $(addonSetting.configTable).html(res);
                }

            },
            _showConfig: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var $config = $(src).find(
                        "service-task-definition > configs > config"
                    );
                    var locale = methods._getLocaleSelector.apply(this, []);
                    var localeCode = methods._getLocale.apply(this, ["en"]);

                    var html = "";

                    var rowPrefix =
                        addonSetting.class.prefix +
                        "-" +
                        addonSetting.class.config +
                        "-" +
                        addonSetting.class.configRow;
                    var itemPrefix = rowPrefix + "-" + addonSetting.class.configRowItem;
                    var labelClass = itemPrefix + "-" + addonSetting.class.label;
                    var requiredClass = itemPrefix + "-" + addonSetting.class.required;
                    var elClass = itemPrefix + "-" + addonSetting.class.el;
                    var formTypeClass = itemPrefix + "-" + addonSetting.class.formType;
                    var dataTypesClass = itemPrefix + "-" + addonSetting.class.dataTypes;
                    var dataTypeClass =
                        itemPrefix +
                        "-" +
                        addonSetting.class.dataTypes +
                        "-" +
                        addonSetting.class.dataType;

                    $config.each(function(index, val) {
                        var row = "";

                        //
                        var label = $(this)
                            .find("label" + locale)
                            .html();
                        if (!label) {
                            label = $(this)
                                .find("label")
                                .html();
                        }

                        var formType = String($(this).attr("form-type")).toUpperCase();
                        if (formType === "UNDEFINED") {
                            formType = null;
                        }

                        var selectDataTypes = [];
                        var selectDataType = String(
                            $(this).attr("select-data-type")
                        ).toUpperCase();
                        if (selectDataType !== "UNDEFINED") {
                            selectDataTypes = selectDataType.split("|");
                        }
                        var required =
                            String($(this).attr("required")).toLowerCase() === "true";
                        var elEnabled =
                            String($(this).attr("el-enabled")).toLowerCase() === "true";

                        //
                        row += '<div class="' + itemPrefix + " " + labelClass + '">' + label + "</div>";

                        row += '<div class="' + itemPrefix + '-meta" >';
                        if (required) {
                            row +=
                                '<div class="' +
                                itemPrefix +
                                " " +
                                requiredClass +
                                '">' +
                                addonSetting.requiredLabel[localeCode] +
                                "</div>";
                        }

                        if (elEnabled) {
                            row +=
                                '<div class="' +
                                itemPrefix +
                                " " +
                                elClass +
                                '">' +
                                addonSetting.enableEl[localeCode] +
                                "</div>";
                        }

                        row += '<div class="' + itemPrefix + '-meta-data" >';
                        if (formType) {
                            row +=
                                '<div class="' +
                                itemPrefix +
                                " " +
                                formTypeClass +
                                " " +
                                formTypeClass +
                                "-" +
                                formType.toLowerCase() +
                                '">' +
                                addonSetting.formTypeLabel[localeCode][formType] +
                                "</div>";
                        }

                        if (selectDataTypes.length > 0) {
                            row += '<div class="' + itemPrefix + " " + dataTypesClass + '">';
                            for (var i = 0; i < selectDataTypes.length; i++) {
                                var dataTypeLabel =
                                    addonSetting.dataTypeLabel[localeCode][selectDataTypes[i]];
                                row +=
                                    '<div class="' +
                                    dataTypeClass +
                                    " " +
                                    dataTypeClass +
                                    "-" +
                                    selectDataTypes[i].toLowerCase() +
                                    '">' +
                                    dataTypeLabel +
                                    "</div>";
                            }
                            row += "</div>";
                        }
                        row += '</div><!-- meta-data //-->';

                        row += '</div><!-- meta //-->';

                        row = '<div class="' + rowPrefix + '">' + row + "</div>";

                        html += row;
                    });

                    $(addonSetting.config)
                        .html(html)
                        .addClass(
                            addonSetting.class.prefix + "-" + addonSetting.class.config
                        );
                }
            },
            _showIcon: function() {
                var src = $(this).data("addon-src");
                var addonSetting = $(this).data("addon-setting");
                if (src) {
                    var icon = $(src)
                        .find("icon")
                        .html();
                    $(addonSetting.icon).attr("src", "data:image/png;base64," + icon);
                }
            }
        };

        // メソッド呼び出し部分
        if (methods[method]) {
            console.log("methods", methods);
            return methods[method].apply(
                this,
                Array.prototype.slice.call(arguments, 1)
            );
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.tooltip");
        }
    };
})(jQuery);

(function($) {
    $(document).ready(function() {
        $("div[data-questetra='addon-xml-loader']").questetraAddonView();
    });
})(window.jQuery);