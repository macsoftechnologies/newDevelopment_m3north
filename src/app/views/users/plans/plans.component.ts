import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { Router } from '@angular/router';
import { PrintDownloadOptions } from 'app/views/Models/PrintDownloadOptionsDto';
import * as moment from 'moment';
import { SubcontractorService } from 'app/shared/services/subcontractor.service';
import { RequestService } from 'app/shared/services/request.service';
import { PlansDto } from 'app/views/Models/PlansDto';
import { DatePipe } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { ExportExcelService } from 'app/shared/services/export-excel.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ListPopupComponent } from '../Requests/list-popup/list-popup.component';
import { config } from 'config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
interface Building {
  buildingId: number;
  building_name: string;
  planType: string;
  zoneList: {
    floorName: string;
    zoneSubList: {
      value: string;
      className: string;
    }[];
  }[];
}

interface RoomGroup {
  buildingId: number;
  planType: string;
  floorName: string;
  zones: {
    value: string;
    className: string;
  }[];
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  ModalOptions: PrintDownloadOptions;

  PlanForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  datefield: boolean = false;
  monthfield: boolean = false;
  yearfield: boolean = false;
  weekfield: boolean = false;
  ReqData: any[] = [];
  Buildings: Building[] = [];
  getFloors: string[] = []; // For single selection
  getRooms: RoomGroup[] = []; // For single selection

  PlanTypes: any[] = [
    {
      PlanId: 1,
      PlanName: 'Daily Report'
    },
    {
      PlanId: 2,
      PlanName: 'Weekly Report'
    },
  ];

  SubContractors: any[] = [];
  Sites: any[] = [];
  Weeks: any[] = [];
  // Buildings: any[] = [];
  
  filteredFloors: string[] = [];
  filteredRooms: RoomGroup[] = [];
  Years: any[] = [];
  WeekNumbers: any[] = [];
  date: Date;
   days_Names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames = [
    { id:1,Name: "January"}, 
    { id:2,Name: "February"}, 
    { id:3,Name: "March"}, 
    { id:4,Name: "April"}, 
    { id:5,Name: "May"}, 
    { id:6,Name: "June"}, 
    { id:7,Name: "July"}, 
    { id:8,Name: "August"}, 
    { id:9,Name: "September"}, 
    { id:10,Name: "October"}, 
    { id:11,Name: "November"}, 
    { id:12,Name: "December"}, 
  ];
    Cols = [
    { field: 'Company_Name', header: 'Company Name' },
    { field: 'subContractorName', header: 'Sub Contractor' },
    { field: 'Site_Id', header: 'Site' },
    { field: 'Building_Id', header: 'Building' },
    { field: 'Activity', header: 'Activity' },
    { field: 'PermitNo', header: 'Activity Permit No' },
    { field: 'Start_Time', header: 'Start Time' },
    { field: 'End_Time', header: 'End Time' },
    { field: 'Request_status', header: 'Status' },
    { field: 'Notes', header: 'Notes' },
    { field: 'Working_Date', header: 'Working Date' },
    { field: 'Day', header: 'Day' }

  ];

  plansDtodata: PlansDto = {
    // Plans_Id:null,
    Building_Id: null,
    Month: null,
    Week:null,
    Year:null,
    Site_Id:null,
    Date:null,
    // Site_Id:null,
    Sub_Contractor_Id: null,
    Room_Type: null,
    from_date: null,
    to_date: null,

    start_time: null,
    end_time: null,
    area: null,
    permit_type: null
  }
  Planslist: any[] = [];
  dataForExcel = [];
  empPerformance = [
    { ID: 10011, NAME: "A", DEPARTMENT: "Sales", MONTH: "Jan", YEAR: 2020, SALES: 132412, CHANGE: 12, LEADS: 35 },
    { ID: 10012, NAME: "A", DEPARTMENT: "Sales", MONTH: "Feb", YEAR: 2020, SALES: 232324, CHANGE: 2, LEADS: 443 },
    { ID: 10013, NAME: "A", DEPARTMENT: "Sales", MONTH: "Mar", YEAR: 2020, SALES: 542234, CHANGE: 45, LEADS: 345 },
    { ID: 10014, NAME: "A", DEPARTMENT: "Sales", MONTH: "Apr", YEAR: 2020, SALES: 223335, CHANGE: 32, LEADS: 234 },
    { ID: 10015, NAME: "A", DEPARTMENT: "Sales", MONTH: "May", YEAR: 2020, SALES: 455535, CHANGE: 21, LEADS: 12 },
  ];
  DownloadExcelData:any[]=[];
  ListWeeks: any[] = [];
  private allRooms: RoomGroup[] = [];
  private allFloors: { buildingId: number; floorName: string }[] = [];

  gridCols = 2;

  constructor(private fb: FormBuilder, private userservices: UserService,
    private route: Router,public ete: ExportExcelService,
    private subcontrservice: SubcontractorService,
    private requestservice: RequestService,
    private requstservice: RequestService, private http: HttpClient,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver,
    private datePipe: DatePipe) {
    const currentYear = new Date(config.Denmarktz).getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

    for (let i = 2024; i < 2030; i++) {
      this.Years.push(i);
    }
    this.subcontrservice.GetAllSubContractors().subscribe(res => {
      this.SubContractors = res["data"];
    });

    this.requstservice.GetAllSites().subscribe(res => {
      this.Sites = res["data"];
      this.PlanForm.controls["Site"].setValue(res["data"][1]["site_name"]);
      this.plansDtodata.Site_Id=res["data"][1]["site_id"];
      this.GetBuilding(res["data"][1]["site_id"]);
    });
  }
  
  // getRooms: string[] = [];

  ngOnInit(): void {

      this.breakpointObserver.observe(['(max-width: 599px)']) // 👈 custom mobile-only query
      .subscribe(result => {
        this.gridCols = result.matches ? 1 : 2;
      });
   
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.gridCols = 1; // Single column for extra small screens
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.gridCols = 2; // Two columns for small screens
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.gridCols = 2; // Three columns for medium screens
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.gridCols = 2; // Four columns for large screens
      }
    });

    this.PlanForm = this.fb.group({
      Date: [''],
      Year: [''],
      Weekno: [''],
      Month: [''],
      Plantype: [''],
      subContractor: [''],
      Building: [''],
      Site: [''],
      level: [''],
      WorkingDateFrom: [''],
      WorkingDateTo: [''],
      StartTime: [''],
      EndTime: [''],
      area: [''],
      permit_type: ['',],
    });

    this.initializeData();
    this.setupFilterListeners();
  }

   private initializeData(): void {
    const buildingData = this.requestservice.bulidingDataWithIds() as Building[];
    this.Buildings = buildingData;
    
    // Extract all rooms with building references
    this.allRooms = this.extractAllRooms(buildingData);
    
    // Extract all floors with their building references
    this.allFloors = this.extractAllFloors(buildingData);
    
    this.resetFilters();
  }
   private extractAllFloors(buildings: Building[]): { buildingId: number; floorName: string }[] {
    const floors: { buildingId: number; floorName: string }[] = [];
    buildings.forEach(building => {
        floors.push({
          buildingId: building.buildingId,
          floorName: building.planType
        });
    });
    return floors;
  }
  private setupFilterListeners(): void {
    this.PlanForm.get('Building')?.valueChanges.subscribe(buildingIds => {
        this.PlanForm.get('level')?.setValue([], { emitEvent: false });
        this.updateFilters(buildingIds, []);
    });
    
    this.PlanForm.get('level')?.valueChanges.subscribe(levels => {
      this.updateFilters(this.PlanForm.get('Building')?.value, levels);
    });
  }

  private updateFilters(buildingIds: number[] = [], levels: string[] = []): void {
    // Filter floors based on selected buildings
    this.filteredFloors = this.filterFloors(buildingIds);
    
    // Filter rooms based on both buildings and levels
    this.filteredRooms = this.filterRooms(buildingIds, levels);
  }


  private filterFloors(buildingIds: number[]): string[] {
    if (!buildingIds || buildingIds.length === 0) {
        return [...new Set(this.allFloors.map(f => f.floorName))];
    }
    
    const numericBuildingIds = buildingIds.map(id => Number(id));
    
    return [
        ...new Set(
            this.allFloors
                .filter(f => numericBuildingIds.includes(Number(f.buildingId)))
                .map(f => f.floorName)
        )
    ];
}

private filterRooms(buildingIds: number[], levels: string[]): RoomGroup[] {
    const numericBuildingIds = buildingIds?.map(id => Number(id)) || [];
    
    return this.allRooms.filter(room => {
        const buildingMatch = numericBuildingIds.length === 0 || 
                            numericBuildingIds.includes(Number(room.buildingId));
        
        const levelMatch = levels.length === 0 || 
                         levels.includes(room.planType);
        
        return buildingMatch && levelMatch;
    });
}

  private resetFilters(): void {
    this.filteredFloors = [...new Set(this.allFloors.map(f => f.floorName))];
    this.filteredRooms = [...this.allRooms];
  }
    private extractAllRooms(buildings: Building[]): RoomGroup[] {
    const rooms: RoomGroup[] = [];
    buildings.forEach(building => {
      building.zoneList?.forEach(zone => {
        rooms.push({
          buildingId: building.buildingId,
          planType: building.planType,
          floorName: zone.floorName,
          zones: zone.zoneSubList?.map(sub => ({
            value: sub.value,
            className: sub.className
          })) || []
        });
      });
    });
    return rooms;
  }

  Getselectedyear(event) {
    this.ListWeeks.length = 0;
    this.ListWeeks = [];
    this.PlanForm.controls["Weekno"].setValue("");
    let totalweeks = moment(event, "YYYY").isoWeeksInYear();
    for (let i = 1; i <= totalweeks; i++) {
      // this.WeekNumbers.push(i);
      this.getDateOfISOWeek(i, event);
    }
  }

  GetWeek(wknumber, year) {
    this.date = new Date(1, 1, 2020);
    this.date.setDate(this.date.getDate() + 1);
    console.log(this.date)
  }

  getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 7) {
      this.ListWeeks.push(this.datePipe.transform(ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1), 'yyyy/MM/dd') + "  -  " + this.datePipe.transform(ISOweekStart.setDate(simple.getDate() + 7 - simple.getDay()), 'yyyy/MM/dd') + "  -  " + `${w}` );
    }
    else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return ISOweekStart;

  }

  GetselectedPlantype(event) {
    if (event == 1) {
      this.datefield = false;
      this.monthfield = true;
      this.yearfield = true;
      this.weekfield = true;
      this.PlanForm.controls["Date"].setValue("");
      this.PlanForm.controls["Month"].setValue("");
      this.PlanForm.controls["Year"].setValue("");
      this.PlanForm.controls["Weekno"].setValue("");
    }
    else if (event == 2) {
      this.datefield = true;
      this.monthfield = true;
      this.yearfield = false;
      this.weekfield = false;
      this.PlanForm.controls["Date"].setValue("");
      this.PlanForm.controls["Month"].setValue("");
      this.PlanForm.controls["Year"].setValue("");
      this.PlanForm.controls["Weekno"].setValue("");
    }
    if (event == 3) {
      this.datefield = true;
      this.monthfield = false;
      this.yearfield = false;
      this.weekfield = true;
      this.PlanForm.controls["Date"].setValue("");
      this.PlanForm.controls["Month"].setValue("");
      this.PlanForm.controls["Year"].setValue("");
      this.PlanForm.controls["Weekno"].setValue("");
    }
  }
  GetBuilding(event) {
    this.requstservice.GetAllBuildingsbyid(event).subscribe(res => {
      this.Buildings = res["data"];
    });
  }
//   Getplans() {
//     console.log(this.PlanForm.value)
//     this.plansDtodata.Building_Id = this.PlanForm.controls["Building"].value.toString();
//     this.plansDtodata.Sub_Contractor_Id = this.PlanForm.controls["subContractor"].value;
//     this.plansDtodata.Month = this.PlanForm.controls["Month"].value;
//     const dateValue = this.PlanForm.controls["Date"].value;
//     this.plansDtodata.Date = dateValue ? this.datePipe.transform(dateValue, 'yyyy-MM-dd') : "";
//     this.plansDtodata.Year=this.PlanForm.controls["Year"].value;
//     this.plansDtodata.Week=this.PlanForm.controls["Weekno"].value;
//     // this.plansDtodata.Room_Type=this.PlanForm.controls["level"].value;
//       const levelValue = this.PlanForm.controls['level'].value;
// const levelsArray = Array.isArray(levelValue) ? levelValue : [levelValue]; 

// const formattedLevel = levelsArray
//   .filter(val => val !== null && val !== undefined && val !== '') 
//   .map((val: string) => `'${val}'`)
//   .join(',');

// this.plansDtodata.Room_Type = formattedLevel || ""; 

//     const fromDateValue = this.PlanForm.controls["WorkingDateFrom"].value;
// const toDateValue = this.PlanForm.controls["WorkingDateTo"].value;

// this.plansDtodata.from_date = fromDateValue ? this.datePipe.transform(fromDateValue, 'yyyy-MM-dd') : "";
// this.plansDtodata.to_date = toDateValue ? this.datePipe.transform(toDateValue, 'yyyy-MM-dd') : "";

//     this.plansDtodata.start_time = this.PlanForm.controls["StartTime"].value;
//     this.plansDtodata.end_time = this.PlanForm.controls["EndTime"].value;
    
//  const areaValue = this.PlanForm.controls['area'].value;
// const areasArray = Array.isArray(areaValue) ? areaValue : [areaValue]; 

// const formattedArea = areasArray
//   .filter(val => val !== null && val !== undefined && val !== '') 
//   .map((val: string) => `${val}`)
//   .join('|');

// this.plansDtodata.area = formattedArea || ""; 

// this.plansDtodata.permit_type =
//       this.PlanForm.controls['permit_type'].value.toString();

//     this.GetRequestData(this.plansDtodata);
//   }

Getplans() {
  console.log(this.PlanForm.value);

  // ✅ Building (multiple)
  this.plansDtodata.Building_Id = this.PlanForm.controls["Building"].value;
  // this.plansDtodata.Building_Id = buildingValue && buildingValue.length
  //   ? buildingValue.join(",")
  //   : "";

  // ✅ Subcontractor
  this.plansDtodata.Sub_Contractor_Id = this.PlanForm.controls["subContractor"].value || "";

  // ✅ Month
  this.plansDtodata.Month = this.PlanForm.controls["Month"].value || "";

  // ✅ Date
  const dateValue = this.PlanForm.controls["Date"].value;
  this.plansDtodata.Date = dateValue ? this.datePipe.transform(dateValue, 'yyyy-MM-dd') : "";

  // ✅ Year & Week
  this.plansDtodata.Year = this.PlanForm.controls["Year"].value || "";
  this.plansDtodata.Week = this.PlanForm.controls["Weekno"].value || "";

  // ✅ Level (multiple → "'A','B'")
  // const levelValue = this.PlanForm.controls['level'].value || [];
  this.plansDtodata.Room_Type = this.PlanForm.controls['level'].value || [];
  // levelValue.length
  //   ? levelValue.map((val: string) => `'${val}'`).join(",")
  //   : "";

  // ✅ From / To Dates
  const fromDateValue = this.PlanForm.controls["WorkingDateFrom"].value;
  const toDateValue = this.PlanForm.controls["WorkingDateTo"].value;
  this.plansDtodata.from_date = fromDateValue ? this.datePipe.transform(fromDateValue, 'yyyy-MM-dd') : "";
  this.plansDtodata.to_date = toDateValue ? this.datePipe.transform(toDateValue, 'yyyy-MM-dd') : "";

  // ✅ Start/End Time
  this.plansDtodata.start_time = this.PlanForm.controls["StartTime"].value || "";
  this.plansDtodata.end_time = this.PlanForm.controls["EndTime"].value || "";

  // ✅ Area (multiple → "A|B|C")
  const areaValue = this.PlanForm.controls['area'].value || [];
  this.plansDtodata.area = areaValue.length
    ? areaValue.join("|")
    : "";

  // ✅ Permit Type
  this.plansDtodata.permit_type = this.PlanForm.controls['permit_type'].value || "";

  // 🔥 Finally call API
  this.GetRequestData(this.plansDtodata);
}


  openSnackBar(msg) {
    this._snackBar.open(msg, "Close", {
      duration: 2000,
    });
  }

  GetRequestData(searchreq) {
    this.requstservice.GetPlans(this.plansDtodata).subscribe(res => {
      console.log(res);
      if (Array.isArray(res)) {
    this.Planslist = res[0]["data"];
  } else {
    console.log("errorCase", res.message);
    this.openSnackBar(`${res.message}`);
    this.Planslist = [];
  }
    });
  }

isValidDate(date: any): boolean {
  if (!date) return false;

  // if already a Date object
  if (date instanceof Date && !isNaN(date.getTime())) return true;

  // if ISO string or timestamp string
  if (typeof date === 'string') {
    const parsed = Date.parse(date);
    return !isNaN(parsed);
  }

  return false;
}


  exportToExcel() {
    this.DownloadExcelData.length=0;
    this.DownloadExcelData=[];
    this.dataForExcel.length=0;
    this.dataForExcel=[];
    this.Planslist.forEach(x=>
      {
        var day=new Date(x["Working_Date"]).getDay();
        if(!x["permit_type"]) {
          x["permit_type"] = "Construction";
        } 
        // this.DownloadExcelData.push(
        //   {Company_Name:x["Company_Name"],ContractorName:x["subContractorName"],Level:x["Room_Type"],
        //   Building_Name:x["building_name"],Activity:x["Activity"],PermitNo:x["PermitNo"],
        //   Start_Time:x["Start_Time"],End_Time:x["End_Time"],Request_status:x["Request_status"],
        //   Notes:x["Notes"],Working_Date:x["Working_Date"],Day:this.days_Names[day], sub_Contractor_Name: x['subContractorName']}
        // )
        this.DownloadExcelData.push(
          {
            PermitNo: x["PermitNo"], PermitType:x["permit_type"], ContractorName: x["subContractorName"], Sub_Contractor_Name: x['new_sub_contractor'], Building_Name: x["building_name"], Level: x["Room_Type"],
            Room_Nos: x['Room_Nos'], Activity: x["Activity"],description_of_activity: x["description_of_activity"], Rams_Number: x["rams_number"],HRAs: this.printHRAS(x),Auth:x[""],Comment: x[""],
            Start_Time: x["Start_Time"], End_Time: x["End_Time"], Night_Shift: this.nightShiftCheck(x), New_End_Time: x["new_end_time"], Request_status: x["Request_status"],
            Notes: x["Notes"], Working_Date: x["Working_Date"], Day: this.days_Names[day], New_Date: x["new_date"], New_Day: this.findNewDay(x),
          }
        )
      });

    this.DownloadExcelData.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    });

    let reportData = {
      title: 'PERMIT CO-ORDINATION SHEET',
      data: this.dataForExcel,
      headers: Object.keys(this.DownloadExcelData[0])
    }

    this.ete.exportExcel(reportData);
  }

  nightShiftCheck(rows) {
    return rows["night_shift"] == 1 ? 'Yes' : 'No';
  }

  findNewDay(row) {
    if (row["new_date"] && row["new_date"] !== "00-00-0000") {
      let newDate = new Date(row["new_date"]);
      let newDayIndex = newDate.getDay();
      return this.days_Names[newDayIndex];
    }
    return ""; // Return empty string if new_date is invalid
  }
  
  printHRAS(tableData) {
    let hrasValues = [];
    Object.entries(tableData).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      if ((key == "Hot_work" || key == "working_on_electrical_system" || key == "working_hazardious_substen" || key == "pressure_tesing_of_equipment" || key == "working_at_height" || key == "working_confined_spaces" || key == "work_in_atex_area" || key == "securing_facilities" || key == "excavation_works" || key == "using_cranes_or_lifting") && value == 1) {
        hrasValues.push(key)
      }
    });
    return hrasValues.toString();
  }

  Reset()
  {
    this.PlanForm.reset();
  }
  openPopUp(data) {
    let title = 'Request';
    let dialogRef: MatDialogRef<any> = this.dialog.open(ListPopupComponent, {
      width: '1200px',
      height: '600px',
      disableClose: false,
      data: { title: title, payload: data }
    });
  }
}
