//-------------------------------------
var dbv={};
var records=[];
$('#D__ID').on('load',function(){update_query();grid_data();});
$('#D__ID').on('update',function(){update_query();grid_data();});
$('#query__ID').on('click',function(){update_query();grid_data();});
$("#p__ID").on('click',function(){  var I=$("#I__ID").text();I--;$("#I__ID").text(I); grid_data();});
$("#n__ID").on('click',function(){  var I=$("#I__ID").text();I++;$("#I__ID").text(I); grid_data();});
//-----------------------------------------------
var headers=[];
var columns=[];
var ay=_fields.split(',');
for(var i=0;i<ay.length;i++){
    var a=ay[i].split('|')[0].replace(/_/g,' ');
    var b=ay[i].split('|').pop();
    if(a!=='Hidden'){
        headers.push(a);
        columns.push({data:b,readOnly:true});
    }
}
//-----------------------------------------------
$('#page_size__ID').on('change', function(){
    update_query();grid_data();
});
//-----------------------------------------------
var grid_data=function(){
    var req_data={
          cmd:"query_records",
          sql:sql_g,
          s1:$('#FY__ID').val(),
          s2:$('#Q__ID').val(),
          sql_n:sql_n,
          I:$('#I__ID').text(),
          page_size:$('#page_size__ID').val()
    }
    $VmAPI.request({data:req_data,callback:function(res){
        $("#I__ID").text(res.I);
        $("#A__ID").text(res.A);
        records=res.records;
        var top1=$('#excel__ID').offset().top;
        var ht=$('#excel__ID').handsontable({
            data: records,
            colHeaders:headers,
            columns:columns,
            rowHeaders: true,
            manualColumnResize: true,
            fillHandle: false,
            columnSorting: true,
            height: $(window).height()-top1-$('#'+$vm.root_layout_footer).outerHeight()
        });
    }});
};
//-----------------------------------------------
$('#export__ID').on('click',function(){
    //----------------
    var sql_e=sql_g;
    var start=$('#start__ID').val();  if(start==="") start='0';
    var num=$('#num__ID').val();    if(num==="") num='0';
    var nStart=30*(parseInt(start)-1)+1;
    var nNum=parseInt(num);
    var from=nStart.toString();
    var to=(nStart+nNum*30-1).toString();
    if(start==="0" && start==="0")  sql_e=sql_e.replace('RowNum between @I6 and @I7','RowNum >0');

    var req_data={
          cmd:"query_records",
          sql:sql_e,
          s1:$('#FY__ID').val(),
          s2:$('#Q__ID').val(),
          i6:from,
          i7:to
    }
    $VmAPI.request({data:req_data,callback:function(res){
        $vm.download_csv({name:name+'.csv',data:res.records,fields:_fields});
    }});
});
//-------------------------------------
$('#back__ID').on('click',function(event){
    event.stopPropagation();
    $vm.back({div:'__ID'});
});
//---------------------------------------------
$('#pv__ID').on('click',function(){
      var style="";
      if($('#D__ID').find('style')[0]!==undefined) style=$('#D__ID').find('style')[0].innerText+" table{font-size:10pt;font-family: Helvetica, Arial, sans-serif;}";
      $('#pvdiv__ID').vm3('popup',style);
});
//---------------------------------------------
