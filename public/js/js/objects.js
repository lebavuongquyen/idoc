/**
 * Created by quinn on 7/17/14.
 * @method enums
 */
var enums = {
    /**
     * @method enums.dateFormatType
     */
    dateFormatType:{frontend:'MM/dd/yy',frontendDateTime:'MM/dd/yy H:MM'},
    /**
     * @method enums.notification
     */
    notification:{
        width:250,
        position:'right',
        time:10000
    },
    kendo:{
        scrollable: true,sortable: true,pageable: {refresh: true,pageSizes: [25,50, 100, 200],buttonCount: 5},
        serverPaging:true,serverSorting:true,serverFiltering:true,
        editable:false, resizable:false,autoBind:true,reorderable:false,filterable:false,navigatable:false
    },
    filmAvailableStatus:{
        press:{
            FILM_HAS_BEEN_ALLOCATED:1,
            NOTHING_HAS_BEEN_PLANNED_FOR_FILM:2,
            HAS_BEEN_PLANNED_BUT_WAITING_FOR_SOMETHING:3,
            FILM_HAS_BEEN_ALLOCATED_AND_IS_IN_INVENTORY:4,
            THERE_HAS_BEEN_FILM_SUBSTITUTED:5,
            EXT_JOB:6,
            SLIT_JOB:7
        }
    },
    productId:{
        none_printed_roll_stock: '1',
        printed_roll_stock: '2',
        none_printed_laminated_roll_stock: '3',
        printed_laminated_roll_stock: '4',
        none_printed_pouches: '5',
        printed_pouches: '6',
        none_printed_bags: '7',
        printed_bags: '8'
    },
    zipper:{
        no: 'No',
        yes: 'Yes',
        flange: "Flange",
        heavy_string: 'Heavy String',
        light_string: 'Light String',
        getCode:function(key){

            if(key == enums.zipper.no) return enums.zipper.no;
            else if(key == enums.zipper.flange) return 'POU10060-Lemo Flange';
            else if(key == enums.zipper.heavy_string) return 'POU10310-Heavy-Duty String';
            else if(key == enums.zipper.light_string) return 'POU10080-Light-Duty String';
            else if(key == enums.zipper.yes) return 'POU10060-Totani Flange';
        }
    },

    /**
     * @method enums.chartFormatDefault
     */
    chartFormatDefault:{
        chartArea: {
            width:'85%',
            height:'75%',
            top:10,left:'8%',
            bottom:20,
            right:'2%'
        },
        height: 600,
        width: 1310,
        title:'Google chart',
        legend:{position: "bottom",textStyle:{fontSize:14}},
        msgNoData:"The selected elements have no data",
        tooltip:{textStyle:{fontSize:14},titleTextStyle:{fontSize:14}},
        vAxis: {viewWindow: {min: 0}},
        hAxis: {showTextEvery: 1, direction: -1, slantedText: true, slantedTextAngle: 45}
    },

    fields:{
        chartTitle:'' +
        '<div class="dialogRow displayFlex verticalCenter bottomLine flexStart">' +
        '<div class="fixedWidth">Enter Chart Title:</div>' +
        '<div class="displayFlex verticalCenter flexMax">' +
        '<textarea name="chartTitle" class="flexMax k-input required" data-msg-error=" Chart title is a required field "></textarea>' +
        '</div>' +
        '</div>',
        fileName:function(obj){
            if(typeof obj == "undefined") obj = new Object();
            return '' +
                '<div class="dialogRow displayFlex verticalCenter">' +
                '<div class="fixedWidth">'+ (typeof obj.label != "undefined" ? obj.label : 'Enter filename to export the data to:') +'</div>' +
                '<div class="displayFlex verticalCenter flexMax">' +
                '<input name="fileName" type="text" class="k-input required" data-msg-error=" File name is a required field " style="width: 100%">' +
                '</div>' +
                '</div>';
        }
    },

    jsChartType:{
        totalJobSuspension: 'JS',
        totalReasonCode: 'RC',
        totalResponsibleDept: 'RD',
        totalResponDeptReasonCode: 'RDRC'
    },

    action:{
        complete: 'complete',
        suspend: 'suspend',
        unSuspend: 'unSuspend',
        reopen: 'reopen',
        approve: 'approve',
        approve_schedule : 'approve_schedule',
        schedule: 'schedule',
        cancel: 'cancel',
        trial_approve: 'trial_approve',
        set_base_date: 'set_base_date',
        publish_approved_job : 'publish_approved_job',
        approve_samples_required: 'approve_samples_required'
    }

    /**
     * ========================
     */
};