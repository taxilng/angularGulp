
'use strict';

module.exports = function(ModalService,FundManagerService,FundManagerModalConstant,toastr,params,ValidationService) {
    var vm = this;

    //pannel
    vm.formPanelOptions = FundManagerModalConstant.formPanelOptions;
    vm.jobContentPanel = FundManagerModalConstant.jobContentPanel;

    //form
    vm.form = FundManagerModalConstant.managerForm;
    //schema
    vm.schema = FundManagerModalConstant.managerSchema;

    //model
    vm.model = {};

    vm.model.catalog = '<blockquote><ul><li><em><s><strong>评价：这个编辑器主要是给会员写日志的时候用的，不需要编辑器有多复杂，选择此编辑器，好处是：轻便，简单...而且是<a href="http://lib.csdn.net/base/jquery" target="_blank">jQuery</a>的，移植性很强哇...但是使用帮助倒是没有详细的具体的例子...</strong></s></em></li><li><em><s><strong>我简单的介绍一下我的使用方法：</strong></s></em></li><li><em><s><strong>取值，很简单：$(&quot;#input&quot;).val()</strong></s></em></li><li><em><s><strong>赋值有点头痛，其实也很简单：</strong></s></em></li><li><em><s><strong>&nbsp;var o = $(&quot;#input&quot;).cleditor()[0];</strong></s></em></li><li><em><s><strong>$(&quot;#input&quot;).val(&ldquo;abcdefg&rdquo;);</strong></s></em></li></ul></blockquote>';

    //function
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;


    var isAdd = true;
    //数据初始化
    init();
    function init(){
        if(params.partyId){
            isAdd = false;
            vm.model.corporateName = params.corporateName;
            vm.model.educationBackground = params.educationBackground;
            vm.model.gender = params.gender;
            vm.model.graduateInsTitutions = params.graduateInsTitutions;
            vm.model.jobContent = params.jobContent;
            vm.model.partyFromDate = moment(params.partyFromDate)['_d'];
            vm.model.partyName = params.partyName;
            vm.model.partyId = params.partyId;
        }

    }



    function autoReceiveSure(ngForm){
        // alert(vm.model.catalog);
         //时间
        var tempInfo = angular.copy(vm.model);
        tempInfo.partyFromDate = timeFormatFilterFilter(tempInfo.partyFromDate,'YYYY-MM-DD');
        if(!checkInput(tempInfo,ngForm)){
            return;
        }
        if(isAdd){
            save(tempInfo);
        }else{
            update(tempInfo);
        }
    }

    //取消
    function dismissModal(){
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    //close
    function closeModal(){
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId);
    }


    function timeFormatFilterFilter(input, format) {
        if (!input) {
            return '';
        }
        var timeParsed = moment(input);
        if (format) {
            return timeParsed.format(format);
        }

        return timeParsed.format('YYYY-MM-DD');
    }

    function save(params){
       
        FundManagerService.save(params).then(function(result) {
            toastr.success('新增成功');
             closeModal();
        }).catch (function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    function update(params){
        FundManagerService.update(params).then(function(result) {
            toastr.success('修改成功');
             closeModal();
        }).catch (function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }


    //校验
    function checkInput(params,ngForm){
        ValidationService.validate(ngForm);
        if(!params.partyName){
            toastr.warning('请输入基金经理姓名');
            return false;
        }else{
            if(ValidationService.containSpecial(params.partyName)){
                toastr.warning('基金经理姓名不能包含特殊字符');
                return false;
            }
        }

        if(!params.gender){
            toastr.warning('请选择基金经理性别');
            return false;
        }

        if(!params.educationBackground){
            toastr.warning('请选择基金经理学历');
            return false;
        }

        if(!params.corporateName){
            toastr.warning('请输入公司名称');
            return false;
        }else{
            if(ValidationService.containSpecial(params.corporateName)){
                toastr.warning('公司名称不能包含特殊字符');
                return false;
            }
        }
        if(!params.partyFromDate){
            toastr.warning('请选择基金经理工作开始时间');
            return false;
        }

        if(!params.jobContent){
            toastr.warning('请输入工作内容');
            return false;
        }
        
        return true;
    }
};
