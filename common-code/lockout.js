var check_permission=function(){
    var output='';
    jQuery.ajaxSetup({async:false});
    $VmAPI.request({data:{cmd:'permissions',pids:'20010706'},callback:function(res){
        if(res[20010706]==undefined || res[20010706]=='0') output='block';
        else output='allow';
    }});
    jQuery.ajaxSetup({async:true});
    return output
}
