angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/custom/adjecent.html","<label class=\"control-label {{form.labelHtmlClass}}\">{{form.title}}</label>\n");
$templateCache.put("directives/decorators/bootstrap/custom/datePicker.html","<div class=\"{{form.divClass}}\">\n    <div class=\"input-group input-large date-picker input-daterange\" data-date=\"{{form.startDate}}\" data-date-format=\"{{form.dateFormat}}\">\n        <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{form.format}}\" ng-model=\"$$value$$\" is-open=\"form.opened\" datepicker-options=\"form.dateOptions\" close-text=\"关闭\" clear-text=\"清空\" current-text=\"今天\"  alt-input-formats=\"form.altInputFormats\" readonly=\"readonly\" />\n        <span class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"buttonClick($event, form)\">\n                <i class=\"glyphicon glyphicon-calendar\"></i>\n            </button>\n        </span>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hActions.html","<div class=\"btn-group schema-form-actions {{form.htmlClass}}\">\n    <input ng-repeat-start=\"item in form.items\" type=\"submit\" class=\"btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}\" value=\"{{item.title}}\" ng-if=\"item.type === \'submit\'\">\n    <button ng-repeat-end=\"\" class=\"btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}\" type=\"button\" ng-disabled=\"form.readonly\" ng-if=\"item.type !== \'submit\'\" ng-click=\"buttonClick($event,item)\"><span ng-if=\"item.icon\" class=\"{{item.icon}}\"></span>{{item.title}}</button>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hAmount.html","<div ng-if=\'form.hidden!=true\' class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\"\n    ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\">\n    <label class=\"control-label {{form.labelHtmlClass}}\"\n        ng-class=\"{\'sr-only\': !showTitle()}\"\n        for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n    <div ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight && !form.fieldIconLeft && !form.fieldIconRight && !form.fieldButtonRight && !form.fieldButtonLeft\" class=\"{{form.divClass}}\">\n        <input\n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            max=\"{{form.max}}\"\n            maxlength=\"20\"\n            step=\"any\"\n            amount=\"form\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n    </div>\n    <div ng-if=\"form.fieldButtonRight || form.fieldButtonLeft\"\n        class=\"input-group {{form.divClass}}\">\n        <div ng-if=\"form.fieldButtonLeft\" class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn {{form.buttonClass}}\" ng-click=\"buttonClick($event, form)\">{{form.buttonLabel}}</button>\n        </div>\n        <input ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"20\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            amount=\"form\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n        <div ng-if=\"form.fieldButtonRight\" class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn {{form.buttonClass}}\" ng-click=\"buttonClick($event, form)\">{{form.buttonLabel}}</button>\n        </div>\n    </div>\n    <div ng-if=\"form.fieldIconLeft || form.fieldIconRight\"\n        class=\"input-icon {{form.divClass}}\"\n        ng-class=\"\'right\': form.fieldIconRight\">\n        <i style=\"color: #ccc; display: block; position: absolute; margin: 11px 2px 4px 10px; width: 16px; height: 16px; font-size: 16px; text-align: center;\" class=\"fa {{form.iconClass}}\"></i>\n        <input ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"16\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            amount=\"form\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n    </div>\n    <div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\"\n        class=\"input-group {{form.divClass}}\">\n        <span ng-if=\"form.fieldAddonLeft\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonLeft\">\n        </span>\n        <input ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"20\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            amount=\"form\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n        <span ng-if=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonRight\">\n        </span>\n    </div>\n    <span ng-if=\"form.feedback !== false\"\n        class=\"form-control-feedback\"\n        ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n        aria-hidden=\"true\">\n    </span>\n    <span ng-if=\"hasError() || hasSuccess()\"\n        id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n        class=\"sr-only\">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}\n    </span>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hArray.html","<div sf-array=\"form\" class=\"schema-form-array {{form.htmlClass}}\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\">\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{ form.title }}</label>\n    <ol class=\"list-group\" ng-model=\"modelArray\" ui-sortable=\"\">\n        <li class=\"list-group-item {{form.fieldHtmlClass}}\" ng-repeat=\"item in modelArray track by $index\">\n            <button ng-hide=\"form.readonly || form.remove === null\" ng-click=\"deleteFromArray($index)\" style=\"position: relative; z-index: 20;\" type=\"button\" class=\"close pull-right\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n            <sf-decorator ng-init=\"arrayIndex = $index\" form=\"copyWithIndex($index)\"></sf-decorator>\n        </li>\n    </ol>\n    <div class=\"clearfix\" style=\"padding: 15px;\">\n        <button ng-hide=\"form.readonly || form.add === null\" ng-click=\"appendToArray()\" type=\"button\" class=\"btn {{ form.style.add || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</button>\n    </div>\n    <div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hButton.html","");
$templateCache.put("directives/decorators/bootstrap/custom/hCheckbox.html","<div class=\"checkbox schema-form-checkbox {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <label class=\"{{form.labelHtmlClass}}\">\n        <input type=\"checkbox\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" class=\"{{form.fieldHtmlClass}}\" name=\"{{form.key.slice(-1)[0]}}\"> <span ng-bind-html=\"form.title\"></span></label>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hCheckboxes.html","<div sf-array=\"form\" ng-model=\"$$value$$\" class=\"form-group schema-form-checkboxes {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\">\n        <label>\n            <input type=\"checkbox\" ng-disabled=\"form.readonly\" sf-changed=\"form\" class=\"{{form.fieldHtmlClass}}\" ng-model=\"titleMapValues[$index]\" name=\"{{form.key.slice(-1)[0]}}\">\n            <span ng-bind-html=\"form.titleMap[$index].name\"></span>\n        </label>\n    </div>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hCondition.html","");
$templateCache.put("directives/decorators/bootstrap/custom/hContainer.html","<div class=\"schema-form-{{form.type}} {{form.htmlClass}}\">\n    <div class=\"form-group\"\n        ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\">\n        <label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n        <div class=\"{{form.divClass}}\">\n            <sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hDatePicker.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\"\n    ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n    <div class=\"{{form.divClass}}\">\n        <div class=\"input-group input-large date-picker input-daterange\" data-date=\"{{form.startDate}}\" data-date-format=\"{{form.dateFormat}}\">\n            <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{form.format}}\" ng-model=\"$$value$$\" is-open=\"form.opened\" datepicker-options=\"form.dateOptions\" close-text=\"关闭\" clear-text=\"清空\" current-text=\"今天\" alt-input-formats=\"form.altInputFormats\" readonly=\"readonly\" />\n            <span class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default\" ng-click=\"buttonClick($event, form)\" ng-disabled=\"{{form.disabled}}\">\n                    <i class=\"glyphicon glyphicon-calendar\"></i>\n                </button>\n            </span>\n        </div>\n          <div ng-if=\"form.checkTime\" ng-model=\"form.timeOptions.mytime\" uib-timepicker  hour-step=\"form.timeOptions.hstep\" minute-step=\"form.timeOptions.mstep\" show-meridian=\"form.timeOptions.ismeridian\"></div>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hDefault.html","<div ng-if=\'form.hidden!=true\' class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\"\n    ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\">\n    <label class=\"control-label {{form.labelHtmlClass}}\"\n        ng-class=\"{\'sr-only\': !showTitle()}\"\n        for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n    <div ng-if=\"!form.typeaheadMap && !form.percentSign && !form.fieldAddonLeft && !form.fieldAddonRight && !form.fieldIconLeft && !form.fieldIconRight && !form.fieldButtonRight && !form.fieldButtonLeft\" class=\"{{form.divClass}}\">\n        <input\n            tabindex=\"0\"\n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            max=\"{{form.max}}\"\n            maxlength=\"{{form.maxlength}}\"\n            step=\"any\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            ng-blur=\"form.onKeyup($event, form,this)\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n    </div>\n    <div ng-if=\"form.fieldButtonRight || form.fieldButtonLeft\"\n        class=\"input-group {{form.divClass}}\">\n        <div ng-if=\"form.fieldButtonLeft\" class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn {{form.buttonClass}}\" ng-click=\"buttonClick($event, form)\">{{form.buttonLabel}}</button>\n        </div>\n        <input\n            tabindex=\"0\"\n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"{{form.maxlength}}\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            ng-blur=\"form.onKeyup($event, form,this)\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n        <div ng-if=\"form.fieldButtonRight\" class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn {{form.buttonClass}}\" ng-click=\"buttonClick($event, form)\">{{form.buttonLabel}}</button>\n        </div>\n    </div>\n    <div ng-if=\"form.fieldIconLeft || form.fieldIconRight\"\n        class=\"input-icon {{form.divClass}}\"\n        ng-class=\"\'right\': form.fieldIconRight\">\n        <i style=\"color: #ccc; display: block; position: absolute; margin: 11px 2px 4px 10px; width: 16px; height: 16px; font-size: 16px; text-align: center;\" class=\"fa {{form.iconClass}}\"></i>\n        <input\n            tabindex=\"0\" \n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"{{form.maxlength}}\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            ng-blur=\"form.onKeyup($event, form,this)\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n    </div>\n    <div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\"\n        class=\"input-group {{form.divClass}}\">\n        <span ng-if=\"form.fieldAddonLeft\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonLeft\">\n        </span>\n        <input\n            tabindex=\"0\" \n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"{{form.maxlength}}\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            ng-blur=\"form.onKeyup($event, form,this)\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n        <span ng-if=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonRight\">\n        </span>\n    </div>\n\n    <div ng-if=\"form.percentSign\"\n        class=\"{{form.divClass}}\">\n        <input\n            tabindex=\"0\"\n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"{{form.maxlength}}\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            schema-validate=\"form\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            ng-blur=\"form.onKeyup($event, form,this)\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n        <span ng-if=\"form.percentSign\" class=\"percent-sign\">%</span>\n    </div>\n    \n    <div ng-if=\"form.typeaheadMap\"\n        class=\"{{form.divClass}}\">\n        <input\n            tabindex=\"0\" \n            ng-show=\"form.key\"\n            type=\"{{form.type}}\"\n            min=\"{{form.min}}\"\n            maxlength=\"{{form.maxlength}}\"\n            max=\"{{form.max}}\"\n            step=\"any\"\n            sf-changed=\"form\"\n            placeholder=\"{{form.placeholder}}\"\n            class=\"form-control {{form.fieldHtmlClass}}\"\n            id=\"{{form.key.slice(-1)[0]}}\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            uib-typeahead=\"state as state.name for state in form.typeaheadMap | filter:{name:$viewValue}\"\n            aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n    </div>\n    <span ng-if=\"form.feedback !== false\"\n        class=\"form-control-feedback\"\n        ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n        aria-hidden=\"true\">\n    </span>\n    <span ng-if=\"hasError() || hasSuccess()\"\n        id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n        class=\"sr-only\">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}\n    </span>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hFieldSet.html","<fieldset ng-disabled=\"form.readonly\" class=\"schema-form-fieldset {{form.htmlClass}}\">\n    <legend ng-class=\"{\'sr-only\': !showTitle() }\">{{ form.title }}</legend>\n    <div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div>\n    <sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator>\n</fieldset>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hHelp.html","<div class=\"helpvalue schema-form-helpvalue {{form.htmlClass}}\" ng-bind-html=\"form.helpvalue\"></div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hLabel.html","<div class=\"form-group {{form.htmlClass}}\">\n    <label class=\"{{form.labelHtmlClass}} control-label\">{{form.title}}</label>\n    <div class=\"{{form.divClass}}\">\n        <label class=\'control-label\'>{{$$value$$}}</label>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hRadioButtons.html","<div class=\"form-group schema-form-radiobuttons {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <div>\n        <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    </div>\n    <div class=\"btn-group\">\n        <label class=\"btn {{ (item.value === $$value$$) ? form.style.selected || \'btn-default\' : form.style.unselected || \'btn-default\'; }}\" ng-class=\"{ active: item.value === $$value$$ }\" ng-repeat=\"item in form.titleMap\">\n            <input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-changed=\"form\" style=\"display: none;\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label>\n    </div>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hRadioInline.html","<div class=\"form-group schema-form-radios-inline {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <label ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div>\n        <label class=\"radio-inline\" ng-repeat=\"item in form.titleMap\">\n            <input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label>\n    </div>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hRadios.html","<div class=\"form-group schema-form-radios {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <label ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div class=\"radio\" ng-repeat=\"item in form.titleMap\">\n        <label>\n            <input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-changed=\"form\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label>\n    </div>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hSection.html","<div class=\"schema-form-section {{form.htmlClass}}\">\n    <sf-decorator ng-repeat=\"item in form.items\" form=\"item\"></sf-decorator>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hSelect.html","<div ng-if=\"form.hidden!=true\" class=\"form-group {{form.htmlClass}} schema-form-select\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n    <div ng-if=\"!form.fieldButtonRight && !form.fieldButtonLeft\" class=\"{{form.divClass}}\">\n        <select ng-model=\"$$value$$\" ui-select2=\"$root.select2Options\" ng-model-options=\"form.ngModelOptions\" ng-disabled=\"form.readonly\"  sf-changed=\"form\" class=\"form-control {{form.fieldHtmlClass}}\" schema-validate=\"form\" ng-options=\"item.value as item.name group by item.group for item in form.titleMap\" name=\"{{form.key.slice(-1)[0]}}\"></select>\n    </div>\n    <div ng-if=\"form.fieldButtonRight || form.fieldButtonLeft\"\n        class=\"input-group {{form.divClass}}\">\n        <div ng-if=\"form.fieldButtonLeft\" class=\"input-group-btn\">\n            <button type=\"button\" class=\"btn {{form.buttonClass}}\" ng-click=\"buttonClick($event, form)\">{{form.buttonLabel}}</button>\n        </div>\n        <select ng-model=\"$$value$$\" ui-select2=\"$root.select2Options\" ng-model-options=\"form.ngModelOptions\" ng-disabled=\"form.readonly\" sf-changed=\"form\" class=\"form-control {{form.fieldHtmlClass}}\" schema-validate=\"form\" ng-options=\"item.value as item.name group by item.group for item in form.titleMap\" name=\"{{form.key.slice(-1)[0]}}\"></select>\n        <div ng-if=\"form.fieldButtonRight\" class=\"input-group-btn {{form.btnBlockClass}}\">\n            <button type=\"button\" class=\"btn {{form.buttonClass}}\" ng-click=\"buttonClick($event, form)\">{{form.buttonLabel}}</button>\n        </div>\n    </div>\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hSubmit.html","<div class=\"form-group schema-form-submit {{form.htmlClass}}\">\n    <input type=\"submit\" class=\"btn {{ form.style || \'btn-primary\' }} {{form.fieldHtmlClass}}\" value=\"{{form.title}}\" ng-disabled=\"form.readonly\" ng-if=\"form.type === \'submit\'\">\n    <button class=\"btn {{ form.style || \'btn-default\' }}\" type=\"button\" ng-click=\"buttonClick($event,form)\" ng-disabled=\"form.readonly\" ng-if=\"form.type !== \'submit\'\"><span ng-if=\"form.icon\" class=\"{{form.icon}}\"></span> {{form.title}}</button>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hTabArray.html","<div sf-array=\"form\" ng-init=\"selected = { tab: 0 }\" class=\"clearfix schema-form-tabarray schema-form-tabarray-{{form.tabType || \'left\'}} {{form.htmlClass}}\">\n    <div ng-if=\"!form.tabType || form.tabType !== \'right\'\" ng-class=\"{\'col-xs-3\': !form.tabType || form.tabType === \'left\'}\">\n        <ul class=\"nav nav-tabs\" ng-class=\"{ \'tabs-left\': !form.tabType || form.tabType === \'left\'}\">\n            <li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li>\n            <li ng-hide=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = appendToArray().length - 1)\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li>\n        </ul>\n    </div>\n    <div ng-class=\"{\'col-xs-9\': !form.tabType || form.tabType === \'left\' || form.tabType === \'right\'}\">\n        <div class=\"tab-content {{form.fieldHtmlClass}}\">\n            <div class=\"tab-pane clearfix\" ng-repeat=\"item in modelArray track by $index\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\">\n                <sf-decorator ng-init=\"arrayIndex = $index\" form=\"copyWithIndex($index)\"></sf-decorator>\n                <button ng-hide=\"form.readonly\" ng-click=\"selected.tab = deleteFromArray($index).length - 1\" type=\"button\" class=\"btn {{ form.style.remove || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-trash\"></i> {{ form.remove || \'Remove\'}}</button>\n            </div>\n        </div>\n    </div>\n    <div ng-if=\"form.tabType === \'right\'\" class=\"col-xs-3\">\n        <ul class=\"nav nav-tabs tabs-right\">\n            <li ng-repeat=\"item in modelArray track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li>\n            <li ng-hide=\"form.readonly\" ng-click=\"$event.preventDefault() || appendToArray()\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li>\n        </ul>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hTabs.html","<div ng-init=\"selected = { tab: 0 }\" class=\"schema-form-tabs {{form.htmlClass}}\">\n    <ul class=\"nav nav-tabs\">\n        <li ng-repeat=\"tab in form.tabs\" ng-disabled=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{ tab.title }}</a></li>\n    </ul>\n    <div class=\"tab-content {{form.fieldHtmlClass}}\">\n        <div class=\"tab-pane\" ng-disabled=\"form.readonly\" ng-repeat=\"tab in form.tabs\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\">\n            <bootstrap-decorator ng-repeat=\"item in tab.items\" form=\"item\"></bootstrap-decorator>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/hTextArea.html","<div class=\"form-group has-feedback {{form.htmlClass}} schema-form-textarea\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <label class=\"{{form.labelHtmlClass}} control-label\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n    <div class=\"{{form.divClass}}\">\n        <textarea ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\" maxlength=\"{{form.maxlength}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\"></textarea>\n    </div>\n    <div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\" ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\" class=\"{{form.divClass}}\">\n        <span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <textarea class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" maxlength=\"{{form.maxlength}}\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" ng-model-options=\"form.ngModelOptions\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\"></textarea>\n        <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span>\n    </div>\n    <span class=\"help-block\" sf-message=\"form.description\"></span>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/custom/input.html","<input ng-show=\"form.key\"\n      type=\"{{form.type}}\"\n      step=\"any\"\n      sf-changed=\"form\"\n      placeholder=\"{{form.placeholder}}\"\n      class=\"form-control-modified {{form.fieldHtmlClass}}\"\n      id=\"{{form.key.slice(-1)[0]}}\"\n      ng-model-options=\"form.ngModelOptions\"\n      ng-model=\"$$value$$\"\n      ng-disabled=\"form.readonly\"\n      schema-validate=\"form\"\n      name=\"{{form.key.slice(-1)[0]}}\"\n      aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\">\n");
$templateCache.put("directives/decorators/bootstrap/custom/label.html","<label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label>\n");}]);
'use strict';

angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var enumToTitleMap = function(enm) {
                var titleMap = []; //canonical titleMap format is a list.
                enm.forEach(function(name) {
                    titleMap.push({
                        name: name,
                        value: name
                    });
                });
                return titleMap;
            };

            var hDefault = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hDefault') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hDefault';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hDefault);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hDefault',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hDefault',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );

            var hDate = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hDate') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hDate';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hDate);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hDate',
                'directives/decorators/bootstrap/custom/hDate.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hDate',
                'directives/decorators/bootstrap/custom/hDate.html'
            );

            var hAmount = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hAmount') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hAmount';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hAmount);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hAmount',
                'directives/decorators/bootstrap/custom/hAmount.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hAmount',
                'directives/decorators/bootstrap/custom/hAmount.html'
            );

            var hNumber = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hNumber') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'number';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hNumber);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'number',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'number',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );

            var hPassword = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hPassword') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'password';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hPassword);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'password',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'password',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );

            var hSelect = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hSelect' ) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hSelect';
                    if (!f.schema.titleMap) {
                        f.titleMap = enumToTitleMap(schema['enum']);
                    }
                    else{
                        //
                        if(f.schema.titleMap instanceof Array){
                            f.titleMap = f.schema.titleMap;
                        }
                        else{
                            f.titleMap = [];
                            var titleMap = f.schema.titleMap;
                            for(var key in titleMap){
                                f.titleMap.push({
                                    name: key,
                                    value: titleMap[key]
                                });
                            }
                        }
                    }
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hSelect);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hSelect',
                'directives/decorators/bootstrap/custom/hSelect.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hSelect',
                'directives/decorators/bootstrap/custom/hSelect.html'
            );
            var hLabel = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hLabel' ) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hLabel';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hLabel);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hLabel',
                'directives/decorators/bootstrap/custom/hLabel.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hLabel',
                'directives/decorators/bootstrap/custom/hLabel.html'
            );
            var hTextarea = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hTextarea') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hTextarea';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hTextarea);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hTextarea',
                'directives/decorators/bootstrap/custom/hTextArea.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hTextarea',
                'directives/decorators/bootstrap/custom/hTextArea.html'
            );

            var hDatePicker = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'date') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hDatePicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hDatePicker);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hDatePicker',
                'directives/decorators/bootstrap/custom/hDatePicker.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hDatePicker',
                'directives/decorators/bootstrap/custom/hDatePicker.html'
            );

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'label',
                'directives/decorators/bootstrap/custom/label.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'label',
                'directives/decorators/bootstrap/custom/label.html'
            );

            var minDatePicker = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'minDatePicker') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'minDatePicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(minDatePicker);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'minDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'minDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );

            var maxDatePicker = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'maxDatePicker') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'maxDatePicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(maxDatePicker);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'maxDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'maxDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );

            var inputField = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'inputField') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'inputField';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(inputField);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'inputField',
                'directives/decorators/bootstrap/custom/input.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'inputField',
                'directives/decorators/bootstrap/custom/input.html'
            );


            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'adjecent',
                'directives/decorators/bootstrap/custom/adjecent.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'adjecent',
                'directives/decorators/bootstrap/custom/adjecent.html'
            );



            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hContainer',
                'directives/decorators/bootstrap/custom/hContainer.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hContainer',
                'directives/decorators/bootstrap/custom/hContainer.html'
            );
        }
    ]);
