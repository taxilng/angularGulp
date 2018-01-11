'use strict';

var QUERYORGDATA = {"reply":{"returnCode":{"domain":null,"type":"S","code":"AAAAAA"},"resBody":{"orgInfoListJsonStr":"[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"\",\"children\":[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca1\",\"children\":[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6c12\",\"children\":[],\"orgName\":\"润和云天津分行营业部\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c13\",\"orgDesc\":\"天津分行营业部\",\"displayOrder\":\"1\",\"shortName\":\"天津分行营业部\",\"orgSeriNo\":\"803011\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6c12\",\"children\":[],\"orgName\":\"润和云天津分行武清区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c14\",\"orgDesc\":\"天津分行武清区支行\",\"displayOrder\":\"1\",\"shortName\":\"天津分行武清区支行\",\"orgSeriNo\":\"803021\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"}],\"orgName\":\"润和云天津分行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c12\",\"orgDesc\":\"天津分行\",\"displayOrder\":\"1\",\"shortName\":\"天津分行\",\"orgSeriNo\":\"803001\",\"orgLevel\":\"2\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca1\",\"children\":[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6c15\",\"children\":[],\"orgName\":\"润和云上海分行嘉定区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c16\",\"orgDesc\":\"上海分行嘉定区支行\",\"displayOrder\":\"1\",\"shortName\":\"上海分行嘉定区支行\",\"orgSeriNo\":\"805021\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6c15\",\"children\":[],\"orgName\":\"润和云上海分行浦东区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c17\",\"orgDesc\":\"上海分行浦东区支行\",\"displayOrder\":\"1\",\"shortName\":\"上海分行浦东区支行\",\"orgSeriNo\":\"805031\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"}],\"orgName\":\"润和云上海分行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c15\",\"orgDesc\":\"上海分行\",\"displayOrder\":\"1\",\"shortName\":\"上海分行\",\"orgSeriNo\":\"805001\",\"orgLevel\":\"2\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca1\",\"children\":[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6c18\",\"children\":[],\"orgName\":\"润和云广州分行营业部\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c19\",\"orgDesc\":\"广州分行营业部\",\"displayOrder\":\"1\",\"shortName\":\"广州分行营业部\",\"orgSeriNo\":\"806011\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6c18\",\"children\":[],\"orgName\":\"润和云广州分行越秀区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c20\",\"orgDesc\":\"广州分行越秀区支行\",\"displayOrder\":\"1\",\"shortName\":\"广州分行越秀区支行\",\"orgSeriNo\":\"806021\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"}],\"orgName\":\"润和云广州分行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c18\",\"orgDesc\":\"广州分行\",\"displayOrder\":\"1\",\"shortName\":\"广州分行\",\"orgSeriNo\":\"806001\",\"orgLevel\":\"2\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca1\",\"children\":[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca2\",\"children\":[],\"orgName\":\"润和云北京分行营业部\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca3\",\"orgDesc\":\"北京分行营业部\",\"displayOrder\":\"1\",\"shortName\":\"北京分行营业部\",\"orgSeriNo\":\"801011\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca2\",\"children\":[],\"orgName\":\"润和云北京分行西城区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca4\",\"orgDesc\":\"北京分行西城区支行\",\"displayOrder\":\"1\",\"shortName\":\"北京分行西城区支行\",\"orgSeriNo\":\"801021\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca2\",\"children\":[],\"orgName\":\"润和云北京分行东城区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca5\",\"orgDesc\":\"北京分行东城区支行\",\"displayOrder\":\"1\",\"shortName\":\"北京分行东城区支行\",\"orgSeriNo\":\"801031\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca2\",\"children\":[],\"orgName\":\"润和云北京分行朝阳区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca6\",\"orgDesc\":\"北京分行朝阳区支行\",\"displayOrder\":\"1\",\"shortName\":\"北京分行朝阳区支行\",\"orgSeriNo\":\"801041\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca2\",\"children\":[],\"orgName\":\"润和云北京分行海淀区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca7\",\"orgDesc\":\"北京分行海淀区支行\",\"displayOrder\":\"1\",\"shortName\":\"北京分行海淀区支行\",\"orgSeriNo\":\"801051\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"}],\"orgName\":\"润和云北京分行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca2\",\"orgDesc\":\"北京分行\",\"displayOrder\":\"1\",\"shortName\":\"北京分行\",\"orgSeriNo\":\"801001\",\"orgLevel\":\"2\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca1\",\"children\":[{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca8\",\"children\":[],\"orgName\":\"润和云南京分行鼓楼区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c10\",\"orgDesc\":\"南京分行鼓楼区支行\",\"displayOrder\":\"1\",\"shortName\":\"南京分行鼓楼区支行\",\"orgSeriNo\":\"802021\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca8\",\"children\":[],\"orgName\":\"润和云南京分行江宁区支行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6c11\",\"orgDesc\":\"南京分行江宁区支行\",\"displayOrder\":\"1\",\"shortName\":\"南京分行江宁区支行\",\"orgSeriNo\":\"802031\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"},{\"status\":\"1\",\"contacter\":\"王兴松\",\"parentOrgId\":\"d900aee007124c8faa4ab7a1448d6ca8\",\"children\":[],\"orgName\":\"润和云南京分行营业部\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca9\",\"orgDesc\":\"南京分行营业部\",\"displayOrder\":\"1\",\"shortName\":\"南京分行营业部\",\"orgSeriNo\":\"802011\",\"orgLevel\":\"3\",\"contacterMobile\":\"18888888888\"}],\"orgName\":\"润和云南京分行\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca8\",\"orgDesc\":\"南京分行\",\"displayOrder\":\"1\",\"shortName\":\"南京分行\",\"orgSeriNo\":\"802001\",\"orgLevel\":\"2\",\"contacterMobile\":\"18888888888\"}],\"orgName\":\"润和云总行营业部\",\"orgId\":\"d900aee007124c8faa4ab7a1448d6ca1\",\"orgDesc\":\"润和云总行营业部\",\"displayOrder\":\"1\",\"shortName\":\"润和云总行营业部\",\"orgSeriNo\":\"800001\",\"orgLevel\":\"1\",\"contacterMobile\":\"18888888888\"}]"}}};
var ORGADD = {
     reply:{
        returnCode:{
            type:"S"
        },
        resBody:{

        }
    }
};

var ORGUPDATE = {
     reply:{
        returnCode:{
            type:"S"
        },
        resBody:{

        }
    }
};

var ORGDELETE = {
     reply:{
        returnCode:{
            type:"S"
        },
        resBody:{

        }
    }
};

var ORGCHILDINFOREQUEST = {
     reply:{
        resBody:{
            totalSize:'50',
            list: [{
                orgId:'86bc497034d54666826abc19f1de8b01',
                orgSeriNo:'800001',
                parentPrgId:'80000',
                orgOame:'润和云总行营业部',
                shortName:'润和云总行营业部',
                orgLevle:'1',
                status:'1',
                contacter:'李伟',
                contacterMobil:'18601135303',
                orgDesc:'润和云总行营业部',
                displayOrder:'1',
                children: []
            },{
                orgId:'86bc497034d54666826abc19f1de8b01',
                orgSeriNo:'800001',
                parentPrgId:'80000',
                orgOame:'润和云总行营业部',
                shortName:'润和云总行营业部',
                orgLevle:'1',
                status:'1',
                contacter:'李伟',
                contacterMobil:'18601135303',
                orgDesc:'润和云总行营业部',
                displayOrder:'1',
                children: []
            },{
                orgId:'86bc497034d54666826abc19f1de8b01',
                orgSeriNo:'800001',
                parentPrgId:'80000',
                orgOame:'润和云总行营业部',
                shortName:'润和云总行营业部',
                orgLevle:'1',
                status:'1',
                contacter:'李伟',
                contacterMobil:'18601135303',
                orgDesc:'润和云总行营业部',
                displayOrder:'1',
                children: []
            },{
                orgId:'86bc497034d54666826abc19f1de8b01',
                orgSeriNo:'800001',
                parentPrgId:'80000',
                orgOame:'润和云总行营业部',
                shortName:'润和云总行营业部',
                orgLevle:'1',
                status:'1',
                contacter:'李伟',
                contacterMobil:'18601135303',
                orgDesc:'润和云总行营业部',
                displayOrder:'1',
                children: []
            },{
                orgId:'86bc497034d54666826abc19f1de8b01',
                orgSeriNo:'800001',
                parentPrgId:'80000',
                orgOame:'润和云总行营业部',
                shortName:'润和云总行营业部',
                orgLevle:'1',
                status:'1',
                contacter:'李伟',
                contacterMobil:'18601135303',
                orgDesc:'润和云总行营业部',
                displayOrder:'1',
                children: []
            }]
        }
    }
}