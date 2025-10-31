
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { UserService } from "app/shared/services/user.service";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RequestSaveOptionsDialogComponent } from "../request-save-options-dialog/request-save-options-dialog.component";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Observable, forkJoin } from "rxjs";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { startWith, map } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { RequestService } from "app/shared/services/request.service";
import { SubcontractorService } from "app/shared/services/subcontractor.service";
import { EmployeeService } from "app/shared/services/employee.service";
import { RequestDto, EditRequestDto, FilesRequestDto } from "app/views/Models/RequestDto";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import { Inputdata, PDFAnnotationData } from "app/views/Models/input";
import { ActivityService } from "app/shared/services/activity.service";
import { SafetyprecautionService } from "app/shared/services/safetyprecautionservice";
import { TemplateDefinitionBuilder } from "@angular/compiler/src/render3/view/template";
import { TeamService } from "app/shared/services/team.service";
import { TeamsBySubId } from "app/views/Models/TeamsDto";
import { number } from "ngx-custom-validators/src/app/number/validator";
import { config } from "config";
import { RequestBuildingModelComponent } from "app/views/Models/request-building-model/request-building-model.component";
import * as moment from 'moment';
import { environment } from "environments/environment";
import { ElectricalworkService } from "app/shared/services/electricalworks.service";
import { MechanicalworkService } from "app/shared/services/mechanicalworks.service";
import { MatSelectChange } from "@angular/material/select";
import { AddNotes } from "app/views/Models/MultiRequestUpdateDto";
interface Note {
  Notes: string;
  Username: string;
}

@Component({
  selector: "app-new-request",
  templateUrl: "./new-request.component.html",
  styleUrls: ["./new-request.component.css"],
})
export class NewRequestComponent implements OnInit {


  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  //pdfSrc ="https://macsof.com/safesite/1complete_plan.pdf";
  hasError: any = false;
  BaseUrl: string = environment.API_URL;
  spinner = false;
  Assigneditform: boolean = false;
  pdfSrc: string = "";
  // pdfSrc = "../assets/images/complete-plan/1complete_plan_invisible.pdf";
  // pdfSrc = "../assets/images/plans/L05.pdf";
  readonly dpiRatio = 96 / 72;
  public myForm: FormGroup;
  public inputList: Inputdata[] = [];
  type: string = "button";
  btnsty: string = "btn-sty";
  value = "test";
  NewRequestData: any = {};
  selectedbuildimg: string = "";
  selectedholdbtnoption: string = "";
  Reqdate = new Date(config.Denmarktz);
  minDate: Date;
  maxDate: Date;
  name: string;
  dropdownname: string;
  selectedsite: number;
  selected_site_name: string = "";
  selectedbuilding: string;
  selectedfloor: string;
  selectedroom: string;
  nositemselect: boolean = true;
  nobuildingmselect: boolean = true;
  nofloorselected: boolean = true;
  isnewrequestcreated: boolean = false;
  iscmsyes: boolean = false;
  ishotworkyes: boolean = false;
  isnightshiftyes: boolean = false;
  isOtherConditionyes: boolean = false;
  isnewhotworkyes: boolean = false;
  iselectricalyes: boolean = false;
  ishazardousyes: boolean = false;
  istestingyes: boolean = false;
  isHeightsyes: boolean = false;
  isConfinedsyes: boolean = false;
  isAtexAreayes: boolean = false;
  isFacilitiesLotoyes: boolean = false;
  isExcavationWorksyes: boolean = false;
  isCraneLiftingyes: boolean = false;
  isPoweronyes: boolean = false;
  isPressurizationyes: boolean = false;
  isstatusdraft: boolean = false;
  isLOTOPROCEDUREyes: boolean = false;
  RequestForm: FormGroup;
  FilesRequestForm: FormGroup;
  beamimg: string = "";

  visible = true;
  selectable = true;
  rselectable = true;
  Safetypreselectable = true;
  removable = true;
  rmremovable = true;
  editform: boolean = false;
  seditform: boolean = false;
  subeditform: boolean = false;
  issubcontr: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredBadges: Observable<string[]>;
  filteredRooms: Observable<string[]>;
  filteredsafety: Observable<any[]>;
  filteredelectrical: Observable<any[]>;
  filteredmechanical: Observable<any[]>;
  data: any = {};
  Rooms: any[] = [];
  RoomsList: any[] = [];
  Badges: string[] = [];
  EditbadgeArray: string[] = [];
  EditSafetyArray: string[] = [];
  BADGENUMBERS: any[] = [];
  Teams: any[] = [];
  safetyprecdata: any[] = [];
  electricaldata: any[] = [];
  mechanicaldata: any[] = [];
  safetyList: any[] = [];
  electricalList: any[] = [];
  groupedElectricalList: any[] = [];
  mechanicalList: any[] = [];
  hotWorkHeight: number = 100;
  otherConditionHeight: number = 100;
  electricalHeight: number = 100;
  hazardousHeight: number = 100;
  testingHeight: number = 100;
  HeightsHeight: number = 100;
  ConfinedsHeight: number = 100;
  AtexAreaHeight: number = 100;
  FacilitiesLotoHeight: number = 100;
  ExcavationWorksHeight: number = 100;
  CraneLiftingHeight: number = 100;
  PoweronHeight: number = 100;
  PressurizationHeight: number = 100;
  isPneumaticYesDisabled = false;
  isHydrostaticYesDisabled = false;
  @ViewChild("badgeInput") badgeInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  @ViewChild("roomInput") roomInput: ElementRef<HTMLInputElement>;
  @ViewChild("roomauto") roomatAutocomplete: MatAutocomplete;
  @ViewChild('csvInput') csvInput!: ElementRef<HTMLInputElement>;
  @ViewChild('csvInput1') csvInput1!: ElementRef<HTMLInputElement>;
  siteslist: any[] = [];
  buildings: any[] = [];
  floors: any[] = [];

  SubContractors: any[] = [];
  TypeofActivites: any[] = [];
  planSelectedBlocks: any[] = [];

  safetyListMap: any[] = [];
  subContractorMap: any[] = [];
  typeOfActivityMap: any[] = [];
  electricalMap: any[] = [];
  mechanicalMap: any[] = [];
  filteredElectricalGroups: any[] = [];
  filteredMechanicalList: any[] = [];

  blocks: any[] = [];

  CMTs: any[] = [
    {
      id: "1",
      CMTval: "Yes",
    },
    {
      id: "0",
      CMTval: "No",
    },
  ];

  Poweroffs: any[] = [
    {
      Poweroffid: "1",
      Poweroffname: "Yes",
    },
    {
      Poweroffid: "0",
      Poweroffname: "No",
    },
  ];

  HOTWORKs: any[] = [
    {
      id: 1,
      HOTWORKval: "Yes",
    },
    {
      id: 0,
      HOTWORKval: "No",
    },
  ];
  NEWHOTWORKs: any[] = [
    {
      id: 1,
      NEWHOTWORKval: "Yes",
    },
    {
      id: 0,
      NEWHOTWORKval: "No",
    },
  ];
  ELECTRICAL: any[] = [
    {
      id: 1,
      ELECTRICALval: "Yes",
    },
    {
      id: 0,
      ELECTRICALval: "No",
    },
  ];

  HAZARDOUS: any[] = [
    {
      id: 1,
      HAZARDOUSval: "Yes",
    },
    {
      id: 0,
      HAZARDOUSval: "No",
    },
  ];

  TESTINGs: any[] = [
    {
      id: 1,
      TESTINGsval: "Yes",
    },
    {
      id: 0,
      TESTINGsval: "No",
    },
  ];

  WORKHEIGHT: any[] = [
    {
      id: 1,
      WORKHEIGHTval: "Yes",
    },
    {
      id: 0,
      WORKHEIGHTval: "No",
    },
  ];

  CONFINEDSPACEs: any[] = [
    {
      id: 1,
      CONFINEDSPACEval: "Yes",
    },
    {
      id: 0,
      CONFINEDSPACEval: "No",
    },
  ];

  ATEXAREA: any[] = [
    {
      id: 1,
      ATEXAREAval: "Yes",
    },
    {
      id: 0,
      ATEXAREAval: "No",
    },
  ];

  FACILITIESLOTO: any[] = [
    {
      id: 1,
      FACILITIESLOTOval: "Yes",
    },
    {
      id: 0,
      FACILITIESLOTOval: "No",
    },
  ];

  ExcavationWorks: any[] = [
    {
      id: 1,
      ExcavationWorksval: "Yes",
    },
    {
      id: 0,
      ExcavationWorksval: "No",
    },
  ];

  CraneLifting: any[] = [
    {
      id: 1,
      CraneLiftingval: "Yes",
    },
    {
      id: 0,
      CraneLiftingval: "No",
    },
  ];

    ElectricalWorks: any[] = [
    {
      id: 1,
      ElectricalWorksval: "Yes",
    },
    {
      id: 0,
      ElectricalWorksval: "No",
    },
  ];

    MechanicalWorks: any[] = [
    {
      id: 1,
      MechanicalWorksval: "Yes",
    },
    {
      id: 0,
      MechanicalWorksval: "No",
    },
  ];

  LOTOPROCEDUREs: any[] = [
    {
      id: "1",
      LOTOPROCEDUREval: "Yes",
    },
    {
      id: "0",
      LOTOPROCEDUREval: "No",
    },
  ];
  Status: any[] = [
    {
      Statusid: "Hold",
      Statusname: "Hold",
    },
    {
      Statusid: "Draft",
      Statusname: "Draft",
    },
    {
      Statusid: "Approved",
      Statusname: "Approved",
    },
    {
      Statusid: "Rejected",
      Statusname: "Rejected",
    },
    {
      Statusid: "Opened",
      Statusname: "Opened",
    },
    {
      Statusid: "Closed",
      Statusname: "Closed",
    },
  ];
  OperatorStatus: any[] = [
    {
      Statusid: "Hold",
      Statusname: "Hold",
    },
    {
      Statusid: "Approved",
      Statusname: "Approved",
    },
    {
      Statusid: "Rejected",
      Statusname: "Rejected",
    },
    {
      Statusid: "Opened",
      Statusname: "Opened",
    },
    {
      Statusid: "Closed",
      Statusname: "Closed",
    },
  ];
  subStatus: any[] = [
    {
      Statusid: "Hold",
      Statusname: "Hold",
    },
    {
      Statusid: "Draft",
      Statusname: "Draft",
    },
    {
      Statusid: "Opened",
      Statusname: "Opened",
    },
    {
      Statusid: "Closed",
      Statusname: "Closed",
    },
  ];
  TeamsSubDto: TeamsBySubId = {
    subcontId: null,
  };
  Requestdata: RequestDto = {
    username: null,
    electrical_works: null,
    mechanical_works: null,
    work_type: null,
    permit_type: null,
    permit_under: null,
    userId: null,
    Request_Date: null,
    Company_Name: null,
    Sub_Contractor_Id: null,
    Foreman: null,
    Foreman_Phone_Number: null,
    Activity: null,
    Type_Of_Activity_Id: null,
    Working_Date: null,
    Start_Time: null,
    End_Time: null,
    Site_Id: null,
    night_shift: null,
    new_date: "",
    new_end_time: null,
    Building_Id: null,
    Floor_Id: null,
    Room_Nos: null,
    Room_Type: null,
    Crane_Requested: null,
    Crane_Number: null,
    Tools: null,
    Machinery: null,
    Hot_work: null,
    Certified_Person: null,
    LOTO_Procedure: null,
    LOTO_Number: null,
    Power_Off_Required: null,
    Number_Of_Workers: null,
    Badge_Numbers: null,
    Notes: null,
    Request_status: null,
    PermitNo: "1234",
    teamId: null,
    building_name: null,
    tasks_in_progress_in_the_area: null,
    account_during_the_work: null,
    lighting_sufficiently: null,
    spesific_risks_based_on_task: null,
    work_environment_safety_ensured: null,
    course_of_action_in_emergencies: null,
    name_of_the_fire_watcher: null,
    phone_number_of_fire_watcher: null,
    fire_watch_establish: null,
    combustible_material: null,
    safety_measures: null,
    extinguishers_and_fire_blanket: null,
    welding_activitiy: null,
    air_extraction_be_established: null,
    heat_treatment: null,
    new_sub_contractor: null,
    affecting_other_contractors: null,
    other_conditions: null,
    lighting_begin_work: null,
    specific_risks: null,
    environment_ensured: null,
    course_of_action: null,
    working_on_electrical_system: null,
    responsible_for_the_informed: null,
    de_energized: null,
    if_no_loto: null,
    do_risk_assessment: null,
    if_yes_loto: null,
    electrician_certification: null,
    electricity_have_isulation: null,
    working_hazardious_substen: null,
    relevant_mal: null,
    msds: null,
    equipment_taken_account: null,
    ventilation: null,
    hazardaus_substances: null,
    storage_and_disposal: null,
    reachable_case: null,
    checical_risk_assessment: null,
    pressure_tesing_of_equipment: null,
    transfer_of_palnt: null,
    area_drained: null,
    area_depressurised: null,
    area_flused: null,
    tank_area_container: null,
    system_free_for_dust: null,
    loto_plan_submitted: null,
    working_at_height: null,
    segragated_demarkated: null,
    lanyard_attachments: null,
    rescue_plan: null,
    avoid_hazards: null,
    height_training: null,
    supervision: null,
    shock_absorbing: null,
    height_equipments: null,
    vertical_life: null,
    secured_falling: null,
    dropped_objects: null,
    safe_acces: null,
    weather_acceptable: null,
    working_confined_spaces: null,
    vapours_gases: null,
    lel_measurement: null,
    all_equipment: null,
    exit_conditions: null,
    communication_emergency: null,
    rescue_equipments: null,
    space_ventilation: null,
    oxygen_meter: null,
    work_in_atex_area: null,
    ex_area_downgraded: null,
    atmospheric_tester: null,
    flammable_materials: null,
    potential_explosive: null,
    oxygen_meter_confined_spaces: null,
    securing_facilities: null,
    loto_facilities: null,
    system_depressurised: null,
    passive_pause_other: null,
    electricity_have_insulation: null,
    covered_or_secured: null,
    excavation_works: null,
    excavation_segregated: null,
    nn_standards: null,
    danish_regulation: null,
    safe_access_and_egress: null,
    correctly_sloped: null,
    inspection_dates: null,
    marked_drawings: null,
    underground_areas_cleared: null,
    using_cranes_or_lifting: null,
    appointed_person: null,
    vendor_supplier: null,
    lift_plan: null,
    supplied_and_inspected: null,
    legal_required_certificates: null,
    prapared_lifting: null,
    lifting_task_fenced: null,
    overhead_risks: null,
    visible_clothing: null,
    safety_shoes: null,
    helmet: null,

    rams_file: null,
    description_of_activity: null,
    specific_gloves: null,
    eye_protection: null,
    fall_protection: null,
    hearing_protection: null,
    respiratory_protection: null,
    other_ppe: null,
    other_conditions_input: null,
    rams_number: null,
    people_electrician_certification: null,
    denmark_time: null,
    // denmark_date: null,
    //  segragated_demarkated : null,
    system_drained: null,
    excavation_shoring: null,
    createdTime: null,

    // commission fields
    line_walk: null,
    pressure_test_coordinated: null,
    pipework_mic: null,
    loto_plan_attached: null,
    exclusion_zone_calculated: null,
    pneumatic_hydrostatic: null,
    pressure_of_the_test: null,
    safety_valves_calibrated: null,
    power_on: null,
    responsible_for_the_area: null,
    risk_assessment_done: null,
    barriers_signage: null,
    energized_been_tested: null,
    punches_been_closed: null,
    toct_checklist: null,
    informed_aligned: null,
    pressurization: null,
    performed_approved: null,
    flushing_approved: null,
    mc_approved: null,
    visual_inspection: null,
    loto_plan_approved: null,
    follow_media_code: null,
    cq_safety_signs: null,
    pressure_pneumatic: null,
    pressure_hydrostatic: null,
    mc_number_text: null,
  };

  
    filesRequestData: FilesRequestDto = {
    userId: null,
    rams_file: null,
    id: null,
  }

  addNotes: AddNotes= {
    request_id: null,
    permit_no: null,
    user_id: null,
    username: null,
    note: null,
    createdTime: null,
  }

  updaterequestdata: EditRequestDto = {
    low_risk_hotwork: null,
    high_risk_hotwork: null,
    hot_work_checklist_filled: null,
    fire_guard_present:null,
    fields: "",
    work_type: null,
    electrical_works: null,
    mechanical_works: null,
    CoMM_initials: null,
    Request_status1: null,
    permit_type: null,
    userId: null,
    Request_Date: null,
    Company_Name: null,
    Sub_Contractor_Id: null,
    Foreman: null,
    Foreman_Phone_Number: null,
    Activity: null,
    Type_Of_Activity_Id: null,
    Working_Date: null,
    Start_Time: null,
    End_Time: null,
    Site_Id: null,
    Building_Id: null,
    Floor_Id: null,
    Room_Nos: null,
    Room_Type: null,
    Crane_Requested: null,
    Crane_Number: null,
    Tools: null,
    Machinery: null,
    Hot_work: null,
    Certified_Person: null,
    LOTO_Procedure: null,
    LOTO_Number: null,
    Power_Off_Required: null,
    Number_Of_Workers: null,
    Badge_Numbers: null,
    Notes: null,
    Request_status: null,
    PermitNo: null,
    id: null,
    Assign_End_Time: null,
    Assign_Start_Time: null,
    Special_Instructions: null,
    Safety_Precautions: null,
    teamId: null,
    createdTime: null,

    name_of_the_fire_watcher: null,
    phone_number_of_fire_watcher: null,
    tasks_in_progress_in_the_area: null,
    account_during_the_work: null,
    lighting_sufficiently: null,
    spesific_risks_based_on_task: null,
    work_environment_safety_ensured: null,
    course_of_action_in_emergencies: null,
    fire_watch_establish: null,
    combustible_material: null,
    extinguishers_and_fire_blanket: null,
    safety_measures: null,
    welding_activitiy: null,
    heat_treatment: null,
    air_extraction_be_established: null,
    new_sub_contractor: null,
    affecting_other_contractors: null,
    other_conditions: null,
    lighting_begin_work: null,
    specific_risks: null,
    environment_ensured: null,
    course_of_action: null,
    working_on_electrical_system: null,
    responsible_for_the_informed: null,
    de_energized: null,
    if_no_loto: null,
    do_risk_assessment: null,
    if_yes_loto: null,
    electricity_have_isulation: null,
    electrician_certification: null,
    working_hazardious_substen: null,
    relevant_mal: null,
    msds: null,
    ventilation: null,
    equipment_taken_account: null,
    hazardaus_substances: null,
    storage_and_disposal: null,
    reachable_case: null,
    checical_risk_assessment: null,
    pressure_tesing_of_equipment: null,
    transfer_of_palnt: null,
    area_drained: null,
    area_depressurised: null,
    area_flused: null,
    tank_area_container: null,
    system_free_for_dust: null,
    loto_plan_submitted: null,
    working_at_height: null,
    segragated_demarkated: null,
    lanyard_attachments: null,
    rescue_plan: null,
    avoid_hazards: null,
    height_training: null,
    supervision: null,
    shock_absorbing: null,
    vertical_life: null,
    height_equipments: null,
    secured_falling: null,
    dropped_objects: null,
    safe_acces: null,
    weather_acceptable: null,
    working_confined_spaces: null,
    vapours_gases: null,
    lel_measurement: null,
    all_equipment: null,
    exit_conditions: null,
    communication_emergency: null,
    rescue_equipments: null,
    space_ventilation: null,
    oxygen_meter: null,
    work_in_atex_area: null,
    ex_area_downgraded: null,
    atmospheric_tester: null,
    flammable_materials: null,
    potential_explosive: null,
    oxygen_meter_confined_spaces: null,
    securing_facilities: null,
    loto_facilities: null,
    system_depressurised: null,
    passive_pause_other: null,
    covered_or_secured: null,
    excavation_works: null,
    excavation_segregated: null,
    nn_standards: null,
    danish_regulation: null,
    safe_access_and_egress: null,
    correctly_sloped: null,
    inspection_dates: null,
    marked_drawings: null,
    underground_areas_cleared: null,
    using_cranes_or_lifting: null,
    appointed_person: null,
    vendor_supplier: null,
    lift_plan: null,
    supplied_and_inspected: null,
    legal_required_certificates: null,
    prapared_lifting: null,
    lifting_task_fenced: null,
    overhead_risks: null,
    visible_clothing: null,
    safety_shoes: null,
    helmet: null,
    rams_file: [],
    description_of_activity: null,
    specific_gloves: null,
    eye_protection: null,
    fall_protection: null,
    hearing_protection: null,
    respiratory_protection: null,
    other_ppe: null,
    other_conditions_input: null,
    people_electrician_certification: null,
    electricity_have_insulation: null,

    ConM_initials: null,
    ConM_initials1: null,
    cancel_reason: null,
    reject_reason: null,
    name_of_the_fire_watcher1: null,
    phone_number_of_fire_watcher1: null,
    denmark_time: null,
    // denmark_date: null,
    // segragated_demarkated : null,
    system_drained: null,
    excavation_shoring: null,
    rams_number: null,
    night_shift: null,
    new_date: "",
    new_end_time: null,

     line_walk: null,
    pressure_test_coordinated: null,
    pipework_mic: null,
    loto_plan_attached: null,
    exclusion_zone_calculated: null,
    pneumatic_hydrostatic: null,
    pressure_of_the_test: null,
    safety_valves_calibrated: null,
    power_on: null,
    responsible_for_the_area: null,
    risk_assessment_done: null,
    barriers_signage: null,
    energized_been_tested: null,
    punches_been_closed: null,
    toct_checklist: null,
    informed_aligned: null,
    pressurization: null,
    performed_approved: null,
    flushing_approved: null,
    mc_approved: null,
    visual_inspection: null,
    loto_plan_approved: null,
    follow_media_code: null,
    cq_safety_signs: null,
    pressure_pneumatic: null,
    pressure_hydrostatic: null,
    mc_number_text: null,
  };

  userdata: any = {};
  planType: string = "";
  FloorMain: any;
  FloorOrdinates: any = [];
  CurrenttimeNow: string;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private datePipe: DatePipe,
    private userservices: UserService,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private requestsserivies: RequestService,
    private subcntrservice: SubcontractorService,
    private empservice: EmployeeService,
    private _snackBar: MatSnackBar,
    private jwtauth: JwtAuthService,
    private typeactservice: ActivityService,
    private safetyservice: SafetyprecautionService,
    private electicalworkservice: ElectricalworkService,
    private mechanicalworkservice: MechanicalworkService,
    private teamservices: TeamService,
    private cdr: ChangeDetectorRef,
  ) {
    const currentYear = new Date(config.getDenmarkTime.date()).getFullYear();
    this.minDate = new Date(config.getDenmarkTime.date());
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.spinner = true;
  }

  // Map Co-Ordinates
  LK1 = [
    'B 1.1',
    'B 1.2',
    'B 1.T',
    'B 1.CM',
    'B1.1B',
    'B1.2C',
    'B1.3C',
    'B1.1E',
    'B1.2E'
  ];

  L00 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B 1.4E',
    'B 1.4N',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.4A',
    'B1.4B',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.4D',
    'B1.2D',
    'B1.1D'

  ];

  L01 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B 1.4E',
    'B 1.4N',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.4A',
    'B1.4B',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.4D',
    'B1.2D',
    'B1.1D'
  ];

  L02 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B 1.4 Roof',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  L03 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  L04 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  L05 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  L06 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  L07 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  L08 = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.1B',
    'B1.1E',
    'B1.2C',
    'B1.3C',
    'B1.2E',
    'B1.3A',
    'B1.3B',
    'B1.1A',
    'B1.1C',
    'B1.2A',
    'B1.2B',
    'B1.2D',
    'B1.1D'
  ];

  LTA = [
    'B 1.1',
    'B 1.2',
    'B 1.3',
    'B1.2E'
  ];

  // B2 DRWAING CO-ORDINATES

  B2L00 = [
    'B2.1',
    'B2.2',
    'B2.4',
    'B2.5 I',
    'B2.5 II',
    'B2.6',
    'B2.T',
    'B2.2-A',
    'B2.1-A',
    'B2.4-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E',
    // 'B2.1-B',
    // 'B2.2-B',
    // 'B2.4-B',
    // 'B2.1-E'
  ];

  B2L01 = [
    'B2.1',
    'B2.2',
    'B2.4',
    'B2.5 I',
    'B2.5 II',
    'B2.6',
    'B2.1 Roof',
    'B2.2-A',
    'B2.1-A',
    'B2.4-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E',
    // 'B2.1-B',
    // 'B2.2-B',
    // 'B2.4-B',
    // 'B2.1-E'
  ];

  B2L02 = [
    'B2.1',
    'B2.2',
    'B2.4 Roof',
    'B2.5 I',
    'B2.5 II',
    'B2.5 Roof',

    'B2.2-A',
    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E',
    // 'B2.1-B',
    // 'B2.2-B',
    // 'B2.1-E'
  ];

  B2L03 = [
    'B2.1',
    'B2.2',
    'B2.5 I',
    'B2.5 II',

    'B2.2-A',
    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E'
  ];

  B2L04 = [
    'B2.1',
    'B2.2',
    'B2.5 I',
    'B2.5 II',

    'B2.2-A',
    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E'
  ];

  B2L05 = [
    'B2.1',
    'B2.2',
    'B2.5 I',
    'B2.5 II',

    'B2.2-A',
    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E'
  ];

  B2L06 = [
    'B2.1',
    'B2.2',
    'B2.5 I',
    'B2.5 II',

    'B2.2-A',
    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E'
  ];

  B2L07 = [
    'B2.1 Roof',
    'B2.2',
    'B2.5 I',
    'B2.5 II',

    'B2.2-A',
    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E'
  ];

  B2L08 = [
    'B2.1',
    'B2.2',
    'B2.5 Roof',

    'B2.2-A',
    'B2.2-C',
    'B2.1-C',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E',

  ];

  B2LK1 = [
    'B2.1',
    'B2.5 I',
    'B2.5 II',
    'B2.T',

    'B2.1-A',
    'B2.2-C',
    'B2.1-D',
    'B2.1-C',
    'B2.5-B',
    'B2.5-C',
    'B2.5-A',
    'B2.5-D',
    'B2.5-E'
  ]

  // B6 DRWAING CO-ORDINATES

  B6L00A = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.6',
    'B6.T',
    'B6.1A',
    'B6.1Waste',
    'B6.2C',
    'B6.3C'
  ];

  B6L00B = [
    'B6.3',
    'B6.4',
    'B6.5',
    'B6.6',
    'B6.3A',
    'B6.4A',
    'B6.5A',
    'B6.5Waste',
    'B6.6A'
  ];

  B6L01A = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.6',
    'B6.1A',
    'B6.1C',
    'B6.1D',
    'B6.1Waste',
    'B6.2C',
    'B6.3C'
  ];

  B6L01B = [
    'B6.3',
    'B6.4',
    'B6.5',
    'B6.6',
    'B6.3A',
    'B6.4A',
    'B6.5A',
    'B6.5Waste',
    'B6.6A',
  ];

  B6L02A = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.6',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.1Waste',
    'B6.2C',
    'B6.3C',
  ];

  B6L02B = [
    'B6.3',
    'B6.4',
    'B6.5',
    'B6.6',
    'B6.3A',
    'B6.4A',
    'B6.5A',
    'B6.5Waste',
    'B6.6A'
  ];

  B6L03A = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.6',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.1Waste',
    'B6.2C',
    'B6.3C',
  ];

  B6L03B = [
    'B6.3',
    'B6.4',
    'B6.5',
    'B6.6',
    'B6.3A',
  ];

  B6L04 = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.1Waste',
    'B6.2C',
    'B6.3C',
    'B6.3A'

  ];

  B6L05 = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.1Waste',
    'B6.2C',
    'B6.3C',
    'B6.3A'
  ];

  B6L06 = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.1Waste',
    'B6.2C',
    'B6.3C',
    'B6.3A'
  ];

  B6L07 = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.2C',
    'B6.3C',
    'B6.3A'
  ];

  B6L08 = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.1A',
    'B6.1D',
    'B6.1C',
    'B6.1Waste',
    'B6.2C',
    'B6.3C',
    'B6.3A'
  ];

  B6L09 = [
    'B6.1Roof',
    'B6.2Roof',
    'B6.3Roof',
  ];

  B6LK1A = [
    'B6.1',
    'B6.2',
    'B6.3',
    'B6.6'
  ];

  B6LK1B = [
    'B6.3',
    'B6.5',
    'B6.6',
  ];

  // B8 DRWAING CO-ORDINATES

  B8L00 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.4',
    'B8.T',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.3A',
    'B8.3C'

  ];

  B8L01 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.4',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.3A',
    'B8.3C'

  ];
  B8L02 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.4',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.2C',
    'B8.3A',
    'B8.3C'

  ];

  B8L03 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.2C',
    'B8.3A',
    'B8.3C'
  ];

  B8L04 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.2C',
    'B8.3A',
    'B8.3C'

  ];
  B8L05 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.2C',
    'B8.3A',
    'B8.3C'


  ];

  B8L06 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.2C',
    'B8.3A',
    'B8.3C'

  ];

  B8L07 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',
    'B8.2C',
    'B8.3A',
    'B8.3C'
  ];

  B8L08 = [
    'B8.1',
    'B8.2',
    'B8.3',
    'B8.3A',
    'B8.3C',
    'B8.2C',
    'B8.1A',
    'B8.1B',
    'B8.1E',
    'B8.1Waste',

  ];

  B8L09 = [
    'B8.1',
    'B8.2',
    'B8.3',

  ];

  B8LK1 = [
    'B8.1',
    'B8.2',
    'B8.T',


  ];

  JGzones = [
    'Zone-1',
    'Zone-2',
    'Zone-3',
    'Zone-4',

  ]

  JFGroundFloorZones = [
    'ZONE A',
    'ZONE B',

  ]

  ngOnInit(): void {

    // console.log(this.L000)
    this.FilesRequestForm =  this.fb.group({
      rams_file: [""],
    })

    this.RequestForm = this.fb.group({
      low_risk_hotwork: ["",],
      high_risk_hotwork: ["",],
      hot_work_checklist_filled: ["",],
      fire_guard_present: ["",],
      electrical_works: ["",],
      mechanical_works: ["",],
      work_type: ["", ],
      Requestdate: ["", [Validators.required]],
      Companyname: ["", Validators.required],
      Permitnumber: [""],
      Foreman: ["", Validators.required],
      ForemanPhone: ["", Validators.required],
      Activity: ["", Validators.required],
      Startdate: ["", Validators.required],
      StartTime: ["", Validators.required],
      EndTime: ["", Validators.required],
      night_shift: [""],
      newWorkDate: [""],
      new_end_time: [""],
      Site: ["", Validators.required],
      Building: ["", Validators.required],
      FloorName: ["", Validators.required],
      //  RoomNo: ['', Validators.required],
      RoomType: [""],
      Status: [""],
      Tools: ["", Validators.required],
      peopleinvalidcount: ["", Validators.required],
      Note: [""],
      CmtValue: [""],
      Machinery: ["", Validators.required],
      CertifiedPerson: [""],
      LOTONumber: [""],
      SubContractor: ["", Validators.required],
      BADGENUMBER: [""],
      //Edit form
      AssignStartTime: [""],
      AssignEndTime: [""],
      Safetyprecaustion: [""],
      SpecialInstruction: [""],
      TypeActivity: ["", Validators.required],
      Team: [""],
      permit_type: ["",Validators.required],
      //Fedding: this.feedingControl,
      //TechRoom: this.TechRoomControl,
      //Trackname: this.TrackControl,
      // Walkwayname: this.WalkwayControl,
      // Trackblockedname: this.TrackblockedControl,
      //Motorbogie: this.MotorbogieControl,
      //Vehicle: this.VehicleControl,
      //Vehiclestesting: this.VehiclestestingControl,
      //WakingTeam: this.WakingTeamControl,
      // CMTdata: ["", Validators.required],
      Poweroff: [""],
      //Applicant: this.ApplicantControl,
      HOTWORK: ["", Validators.required],
      RAMSNumber: ["", Validators.required],
      fireWatcher: [""],
      fireWatcherNumber: [""],
      floatLabel1: ['', Validators.required],
      // floatLabel2: ['', Validators.required],
      floatLabel3: ['', Validators.required],
      floatLabel4: ['', Validators.required],
      floatLabel5: ['', Validators.required],
      floatLabel6: ['', Validators.required],
      floatLabel7: ['', Validators.required],
      floatLabel8: ['', Validators.required],
      floatLabel9: ['', Validators.required],
      floatLabel10: ['', Validators.required],
      NEWHOTWORK: ['', Validators.required],
      NEWHOTWORK1: ['', Validators.required],
      NEWHOTWORK2: ['', Validators.required],
      LOTOPROCEDURE: [""],
      // new formControl added
      newSubContractor: ["", Validators.required],
      RAMSFileAttach: this.fb.array([]),
      floatLabel11: ['', Validators.required],
      floatLabel12: ['', Validators.required],
      floatLabel13: ['', Validators.required],
      floatLabel14: ['', Validators.required],
      floatLabel15: ['', Validators.required],
      floatLabel16: ['', Validators.required],
      // electrial system form controls
      electricalSystem: ['', Validators.required],
      floatLabel17: ['', Validators.required],
      floatLabel18: ['', Validators.required],
      floatLabel19: ['', Validators.required],
      floatLabel20: ['', Validators.required],
      floatLabel21: ['', Validators.required],
      floatLabel22: ['', Validators.required],
      floatLabel23: ['', ],

      // HAZARDOUS start
      HAZARDOUS: ['', Validators.required],
      floatLabel24: ['', Validators.required],
      floatLabel25: ['', Validators.required],
      floatLabel26: ['', Validators.required],
      floatLabel27: ['', Validators.required],
      floatLabel28: ['', Validators.required],
      floatLabel29: ['', Validators.required],
      floatLabel30: ['', Validators.required],
      floatLabel31: ['', Validators.required],


      //  <!-- testing start -->

      TESTINGs: ['', ],
      floatLabel32: ['',],
      floatLabel33: ['',],
      floatLabel34: ['',],
      floatLabel35: ['',],
      floatLabel36: ['',],
      floatLabel37: ['',],
      floatLabel38: ['',],

      
      floatLabel102: ['', ],
      floatLabel103: ['', ],
      floatLabel104: ['', ],
      floatLabel105: ['', ],
      floatLabel106: ['', ],
      floatLabel107: ['', ],
      pressure_pneumatic: ['',],
      pressure_hydrostatic: ['',],
      floatLabel108: ['', ],
      floatLabel109: ['', ],

      // <!-- height start -->
      WORKHEIGHT: ['', Validators.required],
      segragated_demarkated: ['', Validators.required],
      floatLabel39: ['', Validators.required],
      floatLabel40: ['', Validators.required],
      floatLabel41: ['', Validators.required],
      floatLabel42: ['', Validators.required],
      floatLabel43: ['', Validators.required],
      floatLabel44: ['', Validators.required],
      floatLabel45: ['', Validators.required],
      floatLabel46: ['', Validators.required],
      floatLabel47: ['', Validators.required],
      floatLabel48: ['', Validators.required],
      floatLabel49: ['', Validators.required],
      floatLabel50: ['', Validators.required],
      // CONFINED SPACE
      CONFINEDSPACE: ['', Validators.required],
      floatLabel51: ['', Validators.required],
      floatLabel52: ['', Validators.required],
      floatLabel53: ['', Validators.required],
      floatLabel54: ['', Validators.required],
      floatLabel55: ['', Validators.required],
      floatLabel56: ['', Validators.required],
      floatLabel57: ['', Validators.required],
      floatLabel58: ['', Validators.required],

      // <!-- ATEXAREA START -->
      ATEXAREA: ['',],
      floatLabel59: ['',],
      floatLabel60: ['',],
      floatLabel61: ['',],
      floatLabel62: ['',],
      floatLabel63: ['',],

      // <!-- FACILITIES LOTO start -->
      FACILITIESLOTO: ['',],
      floatLabel64: ['',],
      floatLabel65: ['',],
      system_drained: ['',],
      floatLabel67: ['',],
      floatLabel68: ['',],
      floatLabel69: ['',],
      floatLabel70: ['',],
      // <!-- FACILITIES LOTO end -->

      // <!-- Excavation Works Start -->
      ExcavationWorks: ['', Validators.required],
      floatLabel71: ['', Validators.required],
      floatLabel72: ['', Validators.required],
      excavation_shoring: ['', Validators.required],
      floatLabel74: ['', Validators.required],
      floatLabel75: ['', Validators.required],
      floatLabel76: ['', Validators.required],
      floatLabel77: ['', Validators.required],
      floatLabel78: ['', Validators.required],
      floatLabel79: ['', Validators.required],

      // <!-- Crane Lifting start -->
      CraneLifting: ['', Validators.required],
      floatLabel80: ['', Validators.required],
      floatLabel81: ['', Validators.required],
      floatLabel82: ['', Validators.required],
      floatLabel83: ['', Validators.required],
      floatLabel84: ['', Validators.required],
      floatLabel85: ['', Validators.required],
      floatLabel86: ['', Validators.required],
      floatLabel87: ['', Validators.required],

       // Power on
      Poweron: ['',],
      floatLabel88: ['', ],
      floatLabel89: ['', ],
      floatLabel90: ['', ],
      floatLabel91: ['', ],
      floatLabel92: ['', ],
      floatLabel93: ['', ],
      floatLabel94: ['', ],

      // Pressurization
      Pressurization: ['',],
      floatLabel95: ['', ],
      floatLabel96: ['', ],
      floatLabel97: ['', ],
      mc_number_text: ['',],
      floatLabel98: ['', ],
      floatLabel99: ['', ],
      floatLabel100: ['', ],
      floatLabel101: ['', ],

      VisableClothing: [''],
      SafetyShoes: [''],
      Helmet: [''],
      // mandatoryCheck: ["", Validators.required],
      descriptActivity: ["", Validators.required],
      other_conditions_input: ["", Validators.required],
      specific_gloves: ["",],
      eye_protection: ["", Validators.required],
      fall_protection: ["", Validators.required],
      hearing_protection: ["", Validators.required],
      respiratory_protection: ["", Validators.required],
      other_ppe: ["", Validators.required],
      CoMM_initials: ["",],
      ConM_initials: ["",],
      ConM_initials1: ["",],
      cancel_reason: ["",],
      reject_reason: ["",],
      //AccesstoOtherRoom:this.AccesstoroomControl,
      //Keysneeded:this.KeysneedControl,

      Room: [null, Validators.required],
      SubContractorname: [""],
      rams_file: this.fb.control([])
      //Departconfs:this.departconfControl,
      //RequiredDocument:this.RequiredDocumentControl
    },
    { validators: this.endTimeValidator });

    this.myForm = this.fb.group({});

    this.userdata = this.jwtauth.getUser();
    this.Requestdata.userId = this.userdata["id"];
    this.Requestdata.username = this.userdata["displayName"];

    forkJoin(
      this.requestsserivies.GetAllSites(),
      this.subcntrservice.GetAllSubContractors(),
      this.typeactservice.GetAllActivites(),
      this.safetyservice.GetSafetyprecautions(),
      this.electicalworkservice.GetElectricalworks(),
      this.mechanicalworkservice.GetMechanicalworks(),
    ).subscribe((res) => {
      console.log(res, "res11")
      this.spinner = false;
      this.selectedsite = res[0]["data"][1]["site_id"];
      this.selected_site_name = res[0]["data"][1]["site_name"];
      this.siteslist = res[0]["data"];
      this.Getselectedsiteitem(this.selectedsite);
      this.SubContractors = res[1]["data"];
      if (this.userdata["role"].includes("Subcontractor")) {
        this.issubcontr = true;
        this.RequestForm.controls["SubContractor"].setValue(
          this.userdata["typeId"]
        );
        this.SubContractors.forEach((x) => {
          if (x["id"] == this.userdata["typeId"]) {
            this.Getselectedsubcntrsteams(x["id"]);
            this.RequestForm.controls["SubContractorname"].setValue(
              x["subContractorName"]
            );
          }
        });
      } else if (this.userdata["role"].includes("Admin")) {
        this.issubcontr = false;
      } else if (this.userdata["role"].includes("Department") || this.userdata["role"].includes("Department1")) {
        this.issubcontr = false;
      }
      this.TypeofActivites = res[2]["data"];
      this.safetyList = res[3]["data"];
      this.electricalList = res[4]["data"];
      this.mechanicalList = res[5]["data"];
      // this.Teams = res[4]["data"];

      let temp = [];
      this.safetyList.map((obj) => {
        // console.log(this.RequestForm.value.Safetyprecaustion.includes(obj.id))
        if (this.RequestForm.value.Safetyprecaustion.includes(obj.id))
          temp.push(obj);
        return obj;
      });
      this.safetyprecdata = temp;

       // Group electrical works by module
    this.groupedElectricalList = this.groupByModule(res[4]["data"], 'electrical_works');
      let temp1 = [];
      this.electricalList.map((obj) => {
        // console.log(this.RequestForm.value.Safetyprecaustion.includes(obj.id))
        if (this.RequestForm.value.electrical_works.includes(obj.id))
          temp1.push(obj);
        return obj;
      });
      this.electricaldata = temp1;

      let temp2 = [];
      this.mechanicalList.map((obj) => {
        // console.log(this.RequestForm.value.Safetyprecaustion.includes(obj.id))
        if (this.RequestForm.value.mechanical_works.includes(obj.id))
          temp2.push(obj);
        return obj;
      });
      this.mechanicaldata = temp2;

      /*  this.filteredsafety = this.RequestForm.controls["Safetyprecaustion"].valueChanges.pipe(
           startWith(''),
           // map((fruit: string | null) => fruit ? this._safetyfilter(fruit) : this.safetyList.slice()));
           map(fruit => fruit.length>=1 ? this._safetyfilter(fruit) : [])); */

      this.filteredsafety = this.RequestForm.controls[
        "Safetyprecaustion"
      ].valueChanges.pipe(
        startWith(""),
        map((val) => (val.length >= 1 ? this.filter(val) : []))
      );

      this.filteredelectrical = this.RequestForm.controls[
        "electrical_works"
      ].valueChanges.pipe(
        startWith(""),
        map((val) => (val.length >= 1 ? this.filterelectrical(val) : []))
      );

      this.filteredmechanical = this.RequestForm.controls[
        "mechanical_works"
      ].valueChanges.pipe(
        startWith(""),
        map((val) => (val.length >= 1 ? this.filtermechanical(val) : []))
      );

this.RequestForm.get('permit_type').valueChanges.subscribe(() => {
  this.updateDependentValidators();
});

// Subscribe to all main controls in sections
this.dependentSections.forEach(section => {
  this.RequestForm.get(section.mainControl).valueChanges.subscribe(() => {
    this.updateDependentValidators();
  });
});

// Initialize validators
this.updateDependentValidators();

this.RequestForm.get('floatLabel107').valueChanges.subscribe(val => {
    if (val === '1') {
      // If Pneumatic is Yes, ensure Hydrostatic is not Yes
      if (this.RequestForm.get('floatLabel108').value === '1') {
        this.RequestForm.get('floatLabel108').setValue('0');
      }
    }
  });

  this.RequestForm.get('floatLabel108').valueChanges.subscribe(val => {
    if (val === '1') {
      // If Hydrostatic is Yes, ensure Pneumatic is not Yes
      if (this.RequestForm.get('floatLabel107').value === '1') {
        this.RequestForm.get('floatLabel107').setValue('0');
      }
    }
  });
  this.buildLookups();
    })

    this.data = this.requestsserivies.SelectedRequestData;
    console.log(this.data, "rowdata");
    if (this.data["editform"] == true) {
      this.updaterequestdata.userId = this.userdata["id"];
      if (this.userdata["role"].includes("Subcontractor")) {
        this.editform = true;
        this.seditform = true;
        this.Assigneditform = false;
        this.Status = this.subStatus;
        this.subeditform = true;
        this.SubContractors.forEach((x) => {
          if (x["id"] == this.userdata["typeId"]) {
            this.RequestForm.controls["SubContractorname"].setValue(
              x["subContractorName"]
            );
            this.Getselectedsubcntrsteams(Number.parseInt(x["id"]));
          }
        });
      } else if (this.userdata["role"].includes("Admin")) {
        this.editform = true;
        this.Assigneditform = true;
        this.subeditform = true;
        this.seditform = true;
      } else if (this.userdata["role"].includes("Department") || this.userdata["role"].includes("Department1")) {
        this.editform = true;
        this.Assigneditform = true;
        this.Status = this.OperatorStatus;
        this.seditform = true;
        this.subeditform = true;
      }

      this.isnewrequestcreated = true;

      this.NewRequestData = this.data["payload"];
      this.EditFormDataBinding(this.data["payload"]);
    }
    this.name = "site";
    this.RequestForm.get('Startdate').valueChanges.subscribe((startDateValue: string) => {
    if (startDateValue && this.isnightshiftyes) {
      const startDate = new Date(startDateValue);
      const newWorkDate = new Date(startDate);
      newWorkDate.setDate(startDate.getDate() + 1);
      const formattedDate = this.formatDateWithoutTimezone(newWorkDate);
      this.RequestForm.get('newWorkDate').setValue(formattedDate);
    } else {
      this.RequestForm.get('newWorkDate').reset(); // clear if no startdate or night shift off
    }
  });
    this.filteredElectricalGroups = this.groupedElectricalList;
  this.filteredMechanicalList = this.mechanicalList;
  localStorage.removeItem('firstZoneStatus');
  localStorage.removeItem('globalSelectedBlocks');
  }

  ngOnDestroy(): void {
    // Clear localStorage when dialog closes
    localStorage.removeItem('firstZoneStatus');
  }


  onElectricalOpened(opened: boolean) {
  if (opened) this.filteredElectricalGroups = this.groupedElectricalList;
}

onMechanicalOpened(opened: boolean) {
  if (opened) this.filteredMechanicalList = this.mechanicalList;
}

onElectricalSearch(val: string) {
  if (!val) {
    this.filteredElectricalGroups = this.groupedElectricalList;
    return;
  }
  const lowerVal = val.toLowerCase();
  this.filteredElectricalGroups = this.groupedElectricalList
    .map(group => ({
      module: group.module,
      items: group.items.filter(e => e.name.toLowerCase().includes(lowerVal))
    }))
    .filter(group => group.items.length > 0);
}
onMechanicalSearch(val: string) {
  if (!val) {
    this.filteredMechanicalList = this.mechanicalList;
    return;
  }
  const lowerVal = val.toLowerCase();
  this.filteredMechanicalList = this.mechanicalList.filter(e =>
    e.mechanical_works.toLowerCase().includes(lowerVal)
  );
}

  // Helper function to group by module
private groupByModule(data: any[], displayProperty: string): any[] {
  const grouped = {};
  
  data.forEach(item => {
    const moduleName = item.module || 'Other';
    if (!grouped[moduleName]) {
      grouped[moduleName] = [];
    }
    grouped[moduleName].push({
      id: item.id,
      name: item[displayProperty],
      // Include the original item if needed for other purposes
      original: item
    });
  });
  
  // Convert to array format
  return Object.keys(grouped).map(moduleName => ({
    module: moduleName,
    items: grouped[moduleName]
  }));
}

    
  triggerFileInput(): void {
    if (this.editform) {
      this.csvInput1?.nativeElement.click();
    } else {
      this.csvInput?.nativeElement.click();
    }
  }
  
  endTimeValidator(control: AbstractControl) {
    const startTime = control.get('StartTime')?.value;
    const endTime = control.get('EndTime')?.value;

    if (startTime && endTime) {
      const start = parseInt(startTime.replace(':', ''), 10);
      const end = parseInt(endTime.replace(':', ''), 10);

      if (end <= start) {
        control.get('EndTime')?.setErrors({ invalidEndTime: true });
      } else {
        control.get('EndTime')?.setErrors(null);
      }
    }
    return null;
  }

  onEndTimeChange() {
    this.RequestForm.get('EndTime')?.updateValueAndValidity();
  }
  
  toggleNightShift(isChecked: boolean) {
    this.isnightshiftyes = isChecked;
    this.RequestForm.get('night_shift').setValue(isChecked ? 1 : 0);
    const startDateValue = this.RequestForm.get('Startdate').value;
        if (startDateValue) {
            const startDate = new Date(startDateValue);
            const newWorkDate = new Date(startDate);
            newWorkDate.setDate(startDate.getDate() + 1);
            const formattedDate = this.formatDateWithoutTimezone(newWorkDate);
            this.RequestForm.get('newWorkDate').setValue(formattedDate);
        }
  }

  formatDateWithoutTimezone(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  filter(val: string) {
    return this.safetyList.filter(
      (option) =>
        option.precaution.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }
  filterelectrical(val: string) {
    return this.electricalList.filter(
      (option) =>
        option.electrical_works.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }
  filtermechanical(val: string) {
    return this.mechanicalList.filter(
      (option) =>
        option.mechanical_works.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

  removeFile(fileToRemove: any) {
  // Find the index of the file to remove
  const index = this.images.findIndex(file => file.name === fileToRemove.name);
  
  // If found, remove it from the array
  if (index !== -1) {
    this.images.splice(index, 1);
    
    // Optional: If you need to update any form controls or trigger change detection
    this.cdr.detectChanges();
  }
}

  GetAllSubContractorsData() {
    this.spinner = true;
    this.subcntrservice.GetAllSubContractors().subscribe((res) => {
      this.spinner = false;
      this.SubContractors = res["data"];
    });
  }
  Getselectedsiteitem(event) {
    this.selectedsite = event;
    this.nositemselect = false;
    this.name = "Building";

    this.siteslist.forEach((x) => {
      if (x["site_id"] == event) {
        this.Requestdata.Site_Id = x["site_id"];
        this.updaterequestdata.Site_Id = x["site_id"];
        this.RequestForm.controls["Site"].setValue(
          "M3 North"
        );
        // this.RequestForm.controls["Site"].setValue(x["site_name"]);
      }
    });
    this.spinner = true;
    this.requestsserivies
      .GetAllBuildingsbyid(this.selectedsite)
      .subscribe((res) => {
        this.spinner = false;
        this.buildings = res["data"];
      });
  }
  GetselectedBuildingitem(event) {

    console.log(event, "Data")
    this.selectedbuilding = event;
    this.Requestdata.Building_Id = event;
    this.updaterequestdata.Building_Id = event;
    console.log("Update", this.updaterequestdata.Building_Id)
    this.buildings.forEach((x) => {
      if (x["build_id"] == event) {
        this.RequestForm.controls["Building"].setValue(x["building_name"]);
      }
    });
    // console.log("Buildings", this.buildings)
    if (event == '13') {
      console.log(event)
      this.floors = [
        'External Areas'
      ];
    }
    else if (event == '14') {

      this.floors = [
        'Ground Floor',
        'First Floor',
        'Second Floor',
        'Third Floor',
        'Roof Plan'
      ];
    }
    else if (event == '15') {

      this.floors = [
        'MU90.0',
        'MU90.1',
        'MU90.2',
        'MU90.R'
      ];
    }
    else if (event == '16') {

      this.floors = [
        'MU91.0',
        'MU91.1',
        'MU91.2',
        'MU91.3',
        'MU91.4',
        'MU91.R',

      ];
    }
    else if (event == '17') {
      this.floors = [
        'MB.0',
        'MB.1',
        'MB.2',
        'MB.R',
      ];
    }
    else if (event == '18') {
      this.floors = [
        'MA Basement',
      ];
    }
    else if (event == '19') {
      this.floors = [
        'MA.II 0',
        'MA.II 1',
        'MA.II 2',
        'MA.II 3',
        'MA.II R',      
      ];
    }
    else if (event == '20') {
      this.floors = [
        'MA.III 0',
        'MA.III 1',
        'MA.III 2',
        'MA.III 3',
        'MA.III R',      
      ];
    }


    this.planType = null;
    this.pdfSrc = null;
    this.spinner = true;
    this.requestsserivies.GetAllFloorsbyid(event).subscribe((res) => {
      this.spinner = false;
      console.log(res, "Floors")

    });
    this.nobuildingmselect = false;
    this.name = "Floor";
  }
  Getselectedflooritem(event) {
    this.selectFloorBlocks = [];
    // console.log(this.selectFloorBlocks, 'clear floors')
    // console.log(event);
    if (this.selectedbuilding == '13') {
      // console.log("JG Drawings")
      switch (event) {
        case "External Areas":
          this.planType = "External Areas";
          this.pdfSrc = "assets/images/plans/external/External.pdf";
          this.blocks = [
            { name: "CP EGE", pdfSrc: "assets/images/plans/external/external-zones/CP_EGE.pdf", className: 'CP_EGE', planType: 'External Areas' },
            { name: "Area CT", pdfSrc: "assets/images/plans/external/external-zones/CT_Dark.pdf", className: 'CT_Dark', planType: 'External Areas' },
            { name: "Area MA-I", pdfSrc: "assets/images/plans/external/external-zones/MA_I.pdf", className: 'area-ma-1', planType: 'External Areas' },
            { name: "Area MA-II", pdfSrc: "assets/images/plans/external/external-zones/MA_II.pdf", className: 'area-ma-2', planType: 'External Areas' },
            { name: "Area MA-III", pdfSrc: "assets/images/plans/external/external-zones/MA_III.pdf", className: 'area-ma-3', planType: 'External Areas' },
            { name: "Area MB", pdfSrc: "assets/images/plans/external/external-zones/MB.pdf", className: 'area-mb', planType: 'External Areas' },
            { name: "Area MU", pdfSrc: "assets/images/plans/external/external-zones/MU.pdf", className: 'area-mu', planType: 'External Areas' },
            { name: "Area MT-MS", pdfSrc: "assets/images/plans/external/external-zones/MT-MS.pdf", className: 'area-mt-ms', planType: 'External Areas' },
            { name: "Welfare", pdfSrc: "assets/images/plans/external/external-zones/Welfare_zones.pdf", className: 'Welfare_zones', planType: 'External Areas' },
            { name: "Roads", pdfSrc: "assets/images/plans/external/external-zones/Roads.pdf", className: 'Roads', planType: 'External Areas' },

            { name: "Laydown20", pdfSrc: "assets/images/plans/external/external-zones/Laydown_20.pdf", className: 'Laydown20', planType: 'External Areas' },
            { name: "Laydown30", pdfSrc: "assets/images/plans/external/external-zones/Laydown_30.pdf", className: 'Laydown30', planType: 'External Areas' },
            { name: "Laydown40", pdfSrc: "assets/images/plans/external/external-zones/Laydown_40.pdf", className: 'Laydown40', planType: 'External Areas' },
          ]
          break;
        default:
          break;
      }
    }

    else if (this.selectedbuilding == '14') {
      switch (event) {
        case "Ground Floor":
          this.planType = "Ground Floor";
          this.pdfSrc = "assets/images/plans/MA/GroundFloor/GroundFloor.pdf";
          this.blocks = [
            { name: "10.GF.Backage", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones10/10.GF.Backage.pdf", className: 'GF_Backage', planType: 'Ground Floor' },
            { name: "10.GF.Corridor.N", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones10/10.GF.Corridor.N.pdf", className: 'GF_Corridor_N', planType: 'Ground Floor' },
            { name: "10.GF.Corridor.S", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones10/10.GF.Corridor.S.pdf", className: 'GF_Corridor_S', planType: 'Ground Floor' },
            { name: "10.GF.Frontstage.E", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones10/10.GF.Frontstage.E.pdf", className: 'GF_Frontstage_E', planType: 'Ground Floor' },
            { name: "10.GF.Frontstage.W", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones10/10.GF.Frontstage.W.pdf", className: 'GF_Frontstage_W', planType: 'Ground Floor' },
            { name: "11.0", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones11/11.0.pdf", className: 'eleven_Zone', planType: 'Ground Floor' },
            { name: "70.0A", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones70/70.0A.pdf", className: 'seventyA_Zone', planType: 'Ground Floor' },
            { name: "70.0B", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones70/70.0B.pdf", className: 'seventyB_Zone', planType: 'Ground Floor' },
            { name: "40.0A", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0A.pdf", className: 'fortyA_Zone', planType: 'Ground Floor' },
            { name: "40.0C", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0C.pdf", className: 'fortyC_Zone', planType: 'Ground Floor' },
            { name: "40.0D", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0D.pdf", className: 'fortyD_Zone', planType: 'Ground Floor' },
            { name: "40.0E", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0E.pdf", className: 'fortyE_Zone', planType: 'Ground Floor' },
            { name: "40.0F", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0F.pdf", className: 'fortyF_Zone', planType: 'Ground Floor' },
            { name: "40.0G", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0G.pdf", className: 'fortyG_Zone', planType: 'Ground Floor' },
            { name: "40.0J", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0J.pdf", className: 'fortyJ_Zone', planType: 'Ground Floor' },
            { name: "40.0K", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0K.pdf", className: 'fortyK_Zone', planType: 'Ground Floor' },
            { name: "40.0L", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0L.pdf", className: 'fortyL_Zone', planType: 'Ground Floor' },
            { name: "40.0M", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0M.pdf", className: 'fortyM_Zone', planType: 'Ground Floor' },
            { name: "40.0Q", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0Q.pdf", className: 'fortyQ_Zone', planType: 'Ground Floor' },
            { name: "40.0R", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0R.pdf", className: 'fortyR_Zone', planType: 'Ground Floor' },
            { name: "40.0S", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0S.pdf", className: 'fortyS_Zone', planType: 'Ground Floor' },
            { name: "40.0U", pdfSrc: "assets/images/plans/MA/GroundFloor/Zones40/40.0U.pdf", className: 'fortyU_Zone', planType: 'Ground Floor' },
          ]
          break;
        case "First Floor":
          this.planType = "First Floor";
          this.pdfSrc = "assets/images/plans/MA/FirstFloor/FirstFloor.pdf";
          this.blocks = [
            { name: "10.1F.Backstage", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones10/10.1F.Backstage.pdf", className: 'FristBackstage', planType: 'First Floor' },
            { name: "10.1F.CorridorN", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones10/10.1F.CorridorN.pdf", className: 'FristCorridorN', planType: 'First Floor' },
            { name: "10.1F.FrontstageE", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones10/10.1F.FrontstageE.pdf", className: 'FristFrontstageE', planType: 'First Floor' },
            { name: "10.1F.FrontstageW", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones10/10.1F.FrontstageW.pdf", className: 'FristFrontstageW', planType: 'First Floor' },
            { name: "10.1F.IT", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones10/10.1F.IT.pdf", className: 'FristFIT', planType: 'First Floor' },

            { name: "70.1A", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones70/70.1A.pdf", className: 'firstseventyA', planType: 'First Floor' },
            { name: "70.1B", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones70/70.1B.pdf", className: 'firstseventyB', planType: 'First Floor' },
            { name: "70.1C", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones70/70.1C.pdf", className: 'firstseventyC', planType: 'First Floor' },

            { name: "40.1A", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1A.pdf", className: 'FirstfoutyA', planType: 'First Floor' },
            { name: "40.1B", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1B.pdf", className: 'FirstfoutyB', planType: 'First Floor' },
            { name: "40.1C", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1C.pdf", className: 'FirstfoutyC', planType: 'First Floor' },
            { name: "40.1D", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1D.pdf", className: 'FirstfoutyD', planType: 'First Floor' },
            { name: "40.1E", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1E.pdf", className: 'FirstfoutyE', planType: 'First Floor' },
            { name: "40.1F", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1F.pdf", className: 'FirstfoutyF', planType: 'First Floor' },
            { name: "40.1G", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1G.pdf", className: 'FirstfoutyG', planType: 'First Floor' },
            { name: "40.1I", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1I.pdf", className: 'FirstfoutyI', planType: 'First Floor' },
            { name: "40.1J", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1J.pdf", className: 'FirstfoutyJ', planType: 'First Floor' },
            { name: "40.1K", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1K.pdf", className: 'FirstfoutyK', planType: 'First Floor' },
            { name: "40.1L", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1L.pdf", className: 'FirstfoutyL', planType: 'First Floor' },
            { name: "40.1M", pdfSrc: "assets/images/plans/MA/FirstFloor/Zones40/40.1M.pdf", className: 'FirstfoutyM', planType: 'First Floor' },

          ]
          break;
        case "Second Floor":
          this.planType = "Second Floor";
          this.pdfSrc = "assets/images/plans/MA/SecondFloor/SecondFloor.pdf";
          this.blocks = [
            { name: "10.2F.Backstage", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones10/10.2F.Backstage.pdf", className: 'second_Backstage', planType: 'Second Floor' },
            { name: "10.2F.CorridorS", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones10/10.2F.CorridorS.pdf", className: 'second_CorridorS', planType: 'Second Floor' },
            { name: "10.2F.Distribution", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones10/10.2F.Distribution.pdf", className: 'second_Distribution', planType: 'Second Floor' },
            { name: "10.2F.FrontstageE", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones10/10.2F.FrontstageE.pdf", className: 'second_FrontstageE', planType: 'Second Floor' },
            { name: "10.2F.FrontstageW", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones10/10.2F.FrontstageW.pdf", className: 'second_FrontstageW', planType: 'Second Floor' },

            { name: "70.2A", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones70/70.2A.pdf", className: 'second_Seventy_A', planType: 'Second Floor' },
            { name: "70.2B", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones70/70.2B.pdf", className: 'second_Seventy_B', planType: 'Second Floor' },


            { name: "40.2A.1", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2A.1.pdf", className: 'second_forty_2A_1', planType: 'Second Floor' },
            { name: "40.2A.2", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2A.2.pdf", className: 'second_forty_2A_2', planType: 'Second Floor' },
            { name: "40.2A.3", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2A.3.pdf", className: 'second_forty_2A_3', planType: 'Second Floor' },
            { name: "40.2B", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2B.pdf", className: 'second_forty_2b', planType: 'Second Floor' },
            { name: "40.2C", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2C.pdf", className: 'second_forty_2c', planType: 'Second Floor' },
            { name: "40.2D", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2D.pdf", className: 'second_forty_2d', planType: 'Second Floor' },
            { name: "40.2E", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2E.pdf", className: 'second_forty_2e', planType: 'Second Floor' },
            { name: "40.2F", pdfSrc: "assets/images/plans/MA/SecondFloor/Zones40/40.2F.pdf", className: 'second_forty_2f', planType: 'Second Floor' },

          ]
          break;
        case "Third Floor":
          this.planType = "Third Floor";
          this.pdfSrc = "assets/images/plans/MA/ThirdFloor/ThirdFloor.pdf";
          this.blocks = [
            { name: "Third Floor", pdfSrc: "assets/images/plans/MA/ThirdFloor/ThirdFloor.pdf", className: 'Ma_Third_Floor', planType: 'Third Floor' },

          ]
          break;
        case "Roof Plan":
          this.planType = "Roof Plan";
          this.pdfSrc = "assets/images/plans/MA/Roof/Roof.pdf";
          this.blocks = [
            { name: "Roof Plan", pdfSrc: "assets/images/plans/MA/Roof/Roof.pdf", className: 'Ma_Roof_Plan', planType: 'Roof Plan' },

          ]
          break;
        default:
          break;
      }
    }

    else if (this.selectedbuilding == '15') {
      switch (event) {
        case "MU90.0":
          this.planType = "MU90.0";
          this.pdfSrc = "assets/images/plans/MU90/MU90.0/MU90.0.pdf";
          this.blocks = [
            { name: "MU90.0A", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0A.pdf", className: 'MU90_0A', planType: 'MU90.0' },
            { name: "MU90.0B", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0B.pdf", className: 'MU90_0B', planType: 'MU90.0' },
            { name: "MU90.0C", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0C.pdf", className: 'MU90_0C', planType: 'MU90.0' },
            { name: "MU90.0D", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0D.pdf", className: 'MU90_0D', planType: 'MU90.0' },
            { name: "MU90.0E", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0E.pdf", className: 'MU90_0E', planType: 'MU90.0' },
            { name: "MU90.0F1", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0F1.pdf", className: 'MU90_0F1', planType: 'MU90.0' },
            { name: "MU90.0F2", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0F2.pdf", className: 'MU90_0F2', planType: 'MU90.0' },
            { name: "MU90.0I", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0I.pdf", className: 'MU90_0I', planType: 'MU90.0' },
            { name: "MU90.0K", pdfSrc: "assets/images/plans/MU90/MU90.0/Zones/MU90.0K.pdf", className: 'MU90_0K', planType: 'MU90.0' },

          ]
          break;
        case "MU90.1":
          this.planType = "MU90.1";
          this.pdfSrc = "assets/images/plans/MU90/MU90.1/MU90.1.pdf";
          this.blocks = [
            { name: "MU90.1BN", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1BN.pdf", className: 'MU90_1BN', planType: 'MU90.1' },
            { name: "MU90.1BS", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1BS.pdf", className: 'MU90_1BS', planType: 'MU90.1' },
            { name: "MU90.1C1", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1C1.pdf", className: 'MU90_1C', planType: 'MU90.1' },
            { name: "MU90.1C2", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1C.pdf", className: 'MU90_1C2', planType: 'MU90.1' },
            { name: "MU90.1D", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1D.pdf", className: 'MU90_1D', planType: 'MU90.1' },
            { name: "MU90.1E", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1E.pdf", className: 'MU90_1E', planType: 'MU90.1' },
            { name: "MU90.1F", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1F.pdf", className: 'MU90_1F', planType: 'MU90.1' },
            { name: "MU90.1G", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1G.pdf", className: 'MU90_1G', planType: 'MU90.1' },
            { name: "MU90.1H", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1H.pdf", className: 'MU90_1H', planType: 'MU90.1' },
            { name: "MU90.1I", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1I.pdf", className: 'MU90_1I', planType: 'MU90.1' },
            { name: "MU90.1K", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1K.pdf", className: 'MU90_1K', planType: 'MU90.1' },
            { name: "MU90.1L", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1L.pdf", className: 'MU90_1L', planType: 'MU90.1' },
            { name: "MU90.1M", pdfSrc: "assets/images/plans/MU90/MU90.1/Zones/MU90.1M.pdf", className: 'MU90_1M', planType: 'MU90.1' },
          ]
          break;
        case "MU90.2":
          this.planType = "MU90.2";
          this.pdfSrc = "assets/images/plans/MU90/MU90.2/MU90.2.pdf";
          this.blocks = [
            { name: "MU90.2", pdfSrc: "assets/images/plans/MU90/MU90.2/MU90.2.pdf", className: 'MU90_2', planType: 'MU90.2' },

          ]
          break;
        case "MU90.R":
          this.planType = "MU90.R";
          this.pdfSrc = "assets/images/plans/MU90/MU90.R/MU90.R.pdf";
          this.blocks = [
            { name: "MU90.R", pdfSrc: "assets/images/plans/MU90/MU90.R/MU90.R.pdf", className: 'MU90_R', planType: 'MU90.R' },

          ]
          break;
        default:
          break;
      }
    }

    else if (this.selectedbuilding == '16') {
      switch (event) {
        case "MU91.0":
          this.planType = "MU91.0";
          this.pdfSrc = "assets/images/plans/MU91/MU91.0/GroundFloor.pdf";
          this.blocks = [
            { name: "GroundFloor", pdfSrc: "assets/images/plans/MU91/MU91.0/GroundFloor.pdf", className: 'GroundFloor', planType: 'MU91.0' },

          ]
          break;
        case "MU91.1":
          this.planType = "MU91.1";
          this.pdfSrc = "assets/images/plans/MU91/MU91.1/FirstFloor.pdf";
          this.blocks = [
            { name: "FirstFloor", pdfSrc: "assets/images/plans/MU91/MU91.1/FirstFloor.pdf", className: 'FirstFloor', planType: 'MU91.1' },

          ]
          break;
        case "MU91.2":
          this.planType = "MU91.2";
          this.pdfSrc = "assets/images/plans/MU91/MU91.2/SecondFloor.pdf";
          this.blocks = [
            { name: "SecondFloor", pdfSrc: "assets/images/plans/MU91/MU91.2/SecondFloor.pdf", className: 'SecondFloor', planType: 'MU91.2' },

          ]
          break;
        case "MU91.3":
          this.planType = "MU91.3";
          this.pdfSrc = "assets/images/plans/MU91/MU91.3/ThirdFloor.pdf";
          this.blocks = [
            { name: "ThirdFloor", pdfSrc: "assets/images/plans/MU91/MU91.3/ThirdFloor.pdf", className: 'ThirdFloor', planType: 'MU91.3' },

          ]
          break;
        case "MU91.4":
          this.planType = "MU91.4";
          this.pdfSrc = "assets/images/plans/MU91/MU91.4/FourthFloor.pdf";
          this.blocks = [
            { name: "FourthFloor", pdfSrc: "assets/images/plans/MU91/MU91.4/FourthFloor.pdf", className: 'FourthFloor', planType: 'MU91.4' },

          ]
          break;
        case "MU91.R":
          this.planType = "MU91.R";
          this.pdfSrc = "assets/images/plans/MU91/MU91.R/Roof.pdf";
          this.blocks = [
            { name: "Roof", pdfSrc: "assets/images/plans/MU91/MU91.R/Roof.pdf", className: 'Roof', planType: 'MU91.R' },

          ]
          break;
        default:
          break;
      }
    }

    else if (this.selectedbuilding == '17') {
      switch (event) {
        case "MB.0":
          this.planType = "MB.0";
          this.pdfSrc = "assets/images/plans/MB/GroundFloor/MB_GroundFloor.pdf";
          this.blocks = [
            { name: "MB020.A", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.A.pdf", className: 'MB020_A', planType: 'MB.0' },
            { name: "MB020.B", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.B.pdf", className: 'MB020_B', planType: 'MB.0' },
            { name: "MB020.C", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.C.pdf", className: 'MB020_C', planType: 'MB.0' },
            { name: "MB020.D", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.D.pdf", className: 'MB020_D', planType: 'MB.0' },
            { name: "MB020.E", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.E.pdf", className: 'MB020_E', planType: 'MB.0' },
            { name: "MB020.F", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.F.pdf", className: 'MB020_F', planType: 'MB.0' },
            { name: "MB020.G", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.G.pdf", className: 'MB020_G', planType: 'MB.0' },
            { name: "MB020.H", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.H.pdf", className: 'MB020_H', planType: 'MB.0' },
            { name: "MB020.I", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.I.pdf", className: 'MB020_I', planType: 'MB.0' },
            { name: "MB020.J", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.J.pdf", className: 'MB020_J', planType: 'MB.0' },
            { name: "MB020.K", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.K.pdf", className: 'MB020_K', planType: 'MB.0' },
            { name: "MB020.L", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.L.pdf", className: 'MB020_L', planType: 'MB.0' },
            { name: "MB020.M", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.M.pdf", className: 'MB020_M', planType: 'MB.0' },
            { name: "MB020.N", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.N.pdf", className: 'MB020_N', planType: 'MB.0' },
            { name: "MB020.P", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.P.pdf", className: 'MB020_P', planType: 'MB.0' },
            { name: "MB020.Q1", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.Q1.pdf", className: 'MB020_Q1', planType: 'MB.0' },
            { name: "MB020.Q2", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.Q2.pdf", className: 'MB020_Q2', planType: 'MB.0' },
            { name: "MB020.Q3", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.Q3.pdf", className: 'MB020_Q3', planType: 'MB.0' },
            { name: "MB020.Q4", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.Q4.pdf", className: 'MB020_Q4', planType: 'MB.0' },
            { name: "MB020.R1", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.R1.pdf", className: 'MB020_R1', planType: 'MB.0' },
            { name: "MB020.R2", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.R2.pdf", className: 'MB020_R2', planType: 'MB.0' },
            { name: "MB020.R3", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.R3.pdf", className: 'MB020_R3', planType: 'MB.0' },
            { name: "MB020.S1", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.S1.pdf", className: 'MB020_S1', planType: 'MB.0' },
            { name: "MB020.S2", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.S2.pdf", className: 'MB020_S2', planType: 'MB.0' },
            { name: "MB020.S3", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.S3.pdf", className: 'MB020_S3', planType: 'MB.0' },
            { name: "MB020.T", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.T.pdf", className: 'MB020_T', planType: 'MB.0' },
            { name: "MB020.U", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.U.pdf", className: 'MB020_U', planType: 'MB.0' },
            { name: "MB020.V1", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.V1.pdf", className: 'MB020_V1', planType: 'MB.0' },
            { name: "MB020.V2", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.V2.pdf", className: 'MB020_V2', planType: 'MB.0' },
            { name: "MB020.X1", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.X1.pdf", className: 'MB020_X1', planType: 'MB.0' },
            { name: "MB020.X2", pdfSrc: "assets/images/plans/MB/GroundFloor/Zones/MB020.X2.pdf", className: 'MB020_X2', planType: 'MB.0' },
          ]
          break;
        case "MB.1":
          this.planType = "MB.1";
          this.pdfSrc = "assets/images/plans/MB/FirstFloor/MB_FirstFloor.pdf";
          this.blocks = [
            { name: "MB130.A", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.A.pdf", className: 'MB130_A', planType: 'MB.1' },
            { name: "MB130.B", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.B.pdf", className: 'MB130_B', planType: 'MB.1' },
            { name: "MB130.C", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.C.pdf", className: 'MB130_C', planType: 'MB.1' },
            { name: "MB130.D", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.D.pdf", className: 'MB130_D', planType: 'MB.1' },
            { name: "MB130.E", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.E.pdf", className: 'MB130_E', planType: 'MB.1' },
            { name: "MB130.F", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.F.pdf", className: 'MB130_F', planType: 'MB.1' },
            { name: "MB130.G", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.G.pdf", className: 'MB130_G', planType: 'MB.1' },
            { name: "MB130.H", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.H.pdf", className: 'MB130_H', planType: 'MB.1' },
            { name: "MB130.I", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.I.pdf", className: 'MB130_I', planType: 'MB.1' },
            { name: "MB130.J", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.J.pdf", className: 'MB130_J', planType: 'MB.1' },
            { name: "MB130.K", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.K.pdf", className: 'MB130_K', planType: 'MB.1' },
            { name: "MB130.L", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.L.pdf", className: 'MB130_L', planType: 'MB.1' },
            { name: "MB130.M", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.M.pdf", className: 'MB130_M', planType: 'MB.1' },
            { name: "MB130.N", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.N.pdf", className: 'MB130_N', planType: 'MB.1' },
            { name: "MB130.O", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.O.pdf", className: 'MB130_O', planType: 'MB.1' },
            { name: "MB130.R1", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.R1.pdf", className: 'MB130_R1', planType: 'MB.1' },
            { name: "MB130.S1", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.S1.pdf", className: 'MB130_S1', planType: 'MB.1' },
            { name: "MB130.S2", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.S2.pdf", className: 'MB130_S2', planType: 'MB.1' },
            { name: "MB130.S3", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.S3.pdf", className: 'MB130_S3', planType: 'MB.1' },
            { name: "MB130.T", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.T.pdf", className: 'MB130_T', planType: 'MB.1' },
            { name: "MB130.V1", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.V1.pdf", className: 'MB130_V1', planType: 'MB.1' },
            { name: "MB130.V2", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.V2.pdf", className: 'MB130_V2', planType: 'MB.1' },
            { name: "MB130.Z1", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.Z1.pdf", className: 'MB130_Z1', planType: 'MB.1' },
            { name: "MB130.Z2", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.Z2.pdf", className: 'MB130_Z2', planType: 'MB.1' },
            { name: "MB130.Z3", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.Z3.pdf", className: 'MB130_Z3', planType: 'MB.1' },
            { name: "MB130.Z4", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.Z4.pdf", className: 'MB130_Z4', planType: 'MB.1' },
            { name: "MB130.Z5", pdfSrc: "assets/images/plans/MB/FirstFloor/Zones/MB130.Z5.pdf", className: 'MB130_Z5', planType: 'MB.1' },
          ]
          break;
        case "MB.2":
          this.planType = "MB.2";
          this.pdfSrc = "assets/images/plans/MB/SecondFloor/MB_SecondFloor.pdf";
          this.blocks = [
            { name: "MB240.A", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.A.pdf", className: 'MB240_A', planType: 'MB.2' },
            { name: "MB240.B", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.B.pdf", className: 'MB240_B', planType: 'MB.2' },
            { name: "MB240.C", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.C.pdf", className: 'MB240_C', planType: 'MB.2' },
            { name: "MB240.D", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.D.pdf", className: 'MB240_D', planType: 'MB.2' },
            { name: "MB240.E", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.E.pdf", className: 'MB240_E', planType: 'MB.2' },
            { name: "MB240.F", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.F.pdf", className: 'MB240_F', planType: 'MB.2' },
            { name: "MB240.G", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.G.pdf", className: 'MB240_G', planType: 'MB.2' },
            { name: "MB240.H", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.H.pdf", className: 'MB240_H', planType: 'MB.2' },
            { name: "MB240.I", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.I.pdf", className: 'MB240_I', planType: 'MB.2' },
            { name: "MB240.J", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.J.pdf", className: 'MB240_J', planType: 'MB.2' },
            { name: "MB240.S1", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.S1.pdf", className: 'MB240_S1', planType: 'MB.2' },
            { name: "MB240.S2", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.S2.pdf", className: 'MB240_S2', planType: 'MB.2' },
            { name: "MB240.S3", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.S3.pdf", className: 'MB240_S3', planType: 'MB.2' },
            { name: "MB240.V1", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.V1.pdf", className: 'MB240_V1', planType: 'MB.2' },
            { name: "MB240.Z1", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.Z1.pdf", className: 'MB240_Z1', planType: 'MB.2' },
            { name: "MB240.Z2", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.Z2.pdf", className: 'MB240_Z2', planType: 'MB.2' },
            { name: "MB240.Z3", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.Z3.pdf", className: 'MB240_Z3', planType: 'MB.2' },
            { name: "MB240.Z4", pdfSrc: "assets/images/plans/MB/SecondFloor/Zones/MB240.Z4.pdf", className: 'MB240_Z4', planType: 'MB.2' },
          ]
          break;
        case "MB.R":
          this.planType = "MB.R";
          this.pdfSrc = "assets/images/plans/MB/RoofFloor/MB_Roof.pdf";
          this.blocks = [
            { name: "MB.Roof", pdfSrc: "assets/images/plans/MB/RoofFloor/MB_Roof.pdf", className: 'MB_Roof', planType: 'MB.R' },
          ]
          break;
        default:
          break;
      }
    }

    else if (this.selectedbuilding == '18') {
      switch (event) {
        case "MA Basement":
          this.planType = "MA Basement";
          this.pdfSrc = "assets/images/plans/MABasement/MA_B.pdf";
          this.blocks = [
            { name: "MA_B_B80.0A", pdfSrc: "assets/images/plans/MABasement/Zones/MA_B_B80.0A.pdf", className: 'MA_B_B80_0A', planType: 'MA Basement' },
            { name: "MA_B_B80.0B", pdfSrc: "assets/images/plans/MABasement/Zones/MA_B_B80.0B.pdf", className: 'MA_B_B80_0B', planType: 'MA Basement' },
            { name: "MA_B_B80.0C", pdfSrc: "assets/images/plans/MABasement/Zones/MA_B_B80.0C.pdf", className: 'MA_B_B80_0C', planType: 'MA Basement' },
            { name: "MA_B_B80.0D", pdfSrc: "assets/images/plans/MABasement/Zones/MA_B_B80.0D.pdf", className: 'MA_B_B80_0D', planType: 'MA Basement' },
          ]
          break;
      
        default:
          break;
      }
    }
    

    else if (this.selectedbuilding == '19') {
      switch (event) {
        case "MA.II 0":
          this.planType = "MA.II 0";
          this.pdfSrc = "assets/images/plans/MAII/GroundFloor/MA.II_0.pdf";
          this.blocks = [
            { name: "20.GF.CorridorN", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/20.GF.CorridorN.pdf", className: 'GF_20_CorridorN', planType: 'MA.II 0' },
            { name: "20.GF.CorridorS", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/20.GF.CorridorS.pdf", className: 'GF_20_CorridorS', planType: 'MA.II 0' },
            { name: "50.0A", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0A.pdf", className: 'GF_50_0A', planType: 'MA.II 0' },
            { name: "50.0B", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0B.pdf", className: 'GF_50_0B', planType: 'MA.II 0' },
            { name: "50.0C", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0C.pdf", className: 'GF_50_0C', planType: 'MA.II 0' },
            { name: "50.0D", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0D.pdf", className: 'GF_50_0D', planType: 'MA.II 0' },
            { name: "50.0E", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0E.pdf", className: 'GF_50_0E', planType: 'MA.II 0' },
            { name: "50.0F", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0F.pdf", className: 'GF_50_0F', planType: 'MA.II 0' },

            { name: "50.0G", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0G.pdf", className: 'GF_50_0G', planType: 'MA.II 0' },

            { name: "50.0H", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0H.pdf", className: 'GF_50_0H', planType: 'MA.II 0' },
            { name: "50.0J", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0J.pdf", className: 'GF_50_0J', planType: 'MA.II 0' },
            { name: "50.0K", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0K.pdf", className: 'GF_50_0K', planType: 'MA.II 0' },
            { name: "50.0L", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0L.pdf", className: 'GF_50_0L', planType: 'MA.II 0' },
            { name: "50.0M", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0M.pdf", className: 'GF_50_0M', planType: 'MA.II 0' },
            { name: "50.0N", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0N.pdf", className: 'GF_50_0N', planType: 'MA.II 0' },
            { name: "50.0P", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/50.0P.pdf", className: 'GF_50_0P', planType: 'MA.II 0' },
            { name: "80.0A", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/80.0A.pdf", className: 'GF_80_0A', planType: 'MA.II 0' },
            { name: "80.0B", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/80.0B.pdf", className: 'GF_80_0B', planType: 'MA.II 0' },
            { name: "80.0C", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/80.0C.pdf", className: 'GF_80_0C', planType: 'MA.II 0' },
            { name: "80.0D", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/80.0D.pdf", className: 'GF_80_0D', planType: 'MA.II 0' },
            { name: "80.0E", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/80.0E.pdf", className: 'GF_80_0E', planType: 'MA.II 0' },
            { name: "BS2.0", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/BS2.0.pdf", className: 'GF_BS2_0', planType: 'MA.II 0' },
            { name: "FS3.2", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/FS3.2.pdf", className: 'GF_FS3_2', planType: 'MA.II 0' },
            { name: "FS4.0", pdfSrc: "assets/images/plans/MAII/GroundFloor/Zones/FS4.0.pdf", className: 'GF_FS4_0', planType: 'MA.II 0' },
          ]
          break;
          case "MA.II 1":
            this.planType = "MA.II 1";
            this.pdfSrc = "assets/images/plans/MAII/FirstFloor/MA.II_1.pdf";
            this.blocks = [
              { name: "20.1F.CorridorN", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/20.1F.CorridorN.pdf", className: 'FF_20_CorridorN', planType: 'MA.II 1' },
              { name: "20.1F.CorridorS", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/20.1F.CorridorS.pdf", className: 'FF_20_CorridorS', planType: 'MA.II 1' },
              { name: "50.0A", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.0A.pdf", className: 'FF_50_0A', planType: 'MA.II 1' },
              { name: "50.0D", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.0D.pdf", className: 'FF_50_0D', planType: 'MA.II 1' },
              { name: "50.1A", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1A.pdf", className: 'FF_50_1A', planType: 'MA.II 1' },
              { name: "50.1B", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1B.pdf", className: 'FF_50_1B', planType: 'MA.II 1' },
              { name: "50.1C", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1C.pdf", className: 'FF_50_1C', planType: 'MA.II 1' },
              { name: "50.1D", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1D.pdf", className: 'FF_50_1D', planType: 'MA.II 1' },
              { name: "50.1E", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1E.pdf", className: 'FF_50_1E', planType: 'MA.II 1' },
              { name: "50.1F", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1F.pdf", className: 'FF_50_1F', planType: 'MA.II 1' },
              { name: "50.1G", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1G.pdf", className: 'FF_50_1G', planType: 'MA.II 1' },
              { name: "50.1H", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1H.pdf", className: 'FF_50_1H', planType: 'MA.II 1' },
              { name: "50.1I", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1I.pdf", className: 'FF_50_1I', planType: 'MA.II 1' },
              { name: "50.1J", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1J.pdf", className: 'FF_50_1J', planType: 'MA.II 1' },
              { name: "50.1K", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1K.pdf", className: 'FF_50_1K', planType: 'MA.II 1' },
              { name: "50.1L", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/50.1L.pdf", className: 'FF_50_1L', planType: 'MA.II 1' },
              { name: "60.1P", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/60.1P.pdf", className: 'FF_60_1P', planType: 'MA.II 1' },
              { name: "80.1A", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/80.1A.pdf", className: 'FF_80_1A', planType: 'MA.II 1' },
              { name: "80.1B", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/80.1B.pdf", className: 'FF_80_1B', planType: 'MA.II 1' },
              { name: "80.1C", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/80.1C.pdf", className: 'FF_80_1C', planType: 'MA.II 1' },
              { name: "80.1E", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/80.1E.pdf", className: 'FF_80_1E', planType: 'MA.II 1' },
              { name: "BS2.2", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/BS2.2.pdf", className: 'FF_BS2_2', planType: 'MA.II 1' },
              { name: "FS3.0", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/FS3.0.pdf", className: 'FF_FS3_0', planType: 'MA.II 1' },
              { name: "FS4.0", pdfSrc: "assets/images/plans/MAII/FirstFloor/Zones/FS4.0.pdf", className: 'FF_FS4_0', planType: 'MA.II 1' },
            ]
            break;
            case "MA.II 2":
              this.planType = "MA.II 2";
              this.pdfSrc = "assets/images/plans/MAII/SecondFloor/MA.II_2.pdf";
              this.blocks = [
                { name: "50.2A.1", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2A.1.pdf", className: 'SF_50_2A_1', planType: 'MA.II 2' },
                { name: "50.2A.2", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2A.2.pdf", className: 'SF_50_2A_2', planType: 'MA.II 2' },
                { name: "50.2A.3", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2A.3.pdf", className: 'SF_50_2A_3', planType: 'MA.II 2' },
                { name: "50.2B", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2B.pdf", className: 'SF_50_2B', planType: 'MA.II 2' },
                { name: "50.2C", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2C.pdf", className: 'SF_50_2C', planType: 'MA.II 2' },
                { name: "50.2D", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2D.pdf", className: 'SF_50_2D', planType: 'MA.II 2' },
                { name: "50.2E", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2E.pdf", className: 'SF_50_2E', planType: 'MA.II 2' },
                { name: "50.2F", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/50.2F.pdf", className: 'SF_50_2F', planType: 'MA.II 2' },
                { name: "80.2A", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/80.2A.pdf", className: 'SF_80_2A', planType: 'MA.II 2' },
                { name: "80.2B", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/80.2B.pdf", className: 'SF_80_2B', planType: 'MA.II 2' },
                { name: "80.2C", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/80.2C.pdf", className: 'SF_80_2C', planType: 'MA.II 2' },
                { name: "80.2D", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/80.2D.pdf", className: 'SF_80_2D', planType: 'MA.II 2' },
                { name: "BS2.2", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/BS2.2.pdf", className: 'SF_BS2_2', planType: 'MA.II 2' },
                { name: "FS3.2", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/FS3.2.pdf", className: 'SF_FS3_2', planType: 'MA.II 2' },
                { name: "FS4.2", pdfSrc: "assets/images/plans/MAII/SecondFloor/Zones/FS4.2.pdf", className: 'SF_FS4_2', planType: 'MA.II 2' },
              ]
              break;
              case "MA.II 3":
                this.planType = "MA.II 3";
                this.pdfSrc = "assets/images/plans/MAII/ThirdFloor/MA.II_3.pdf";
                this.blocks = [
                  { name: "50.3A", pdfSrc: "assets/images/plans/MAII/ThirdFloor/Zones/50.3A.pdf", className: 'TF_50_3A', planType: 'MA.II 3' },
                ]
                break;
                case "MA.II R":
                  this.planType = "MA.II R";
                  this.pdfSrc = "assets/images/plans/MAII/Roof/MA.II_R.pdf";
                  this.blocks = [
                    { name: "MA.II_R", pdfSrc: "assets/images/plans/MAII/Roof/MA.II_R.pdf", className: 'RF_R', planType: 'MA.II R' },

                  ]
                  break;
      
        default:
          break;
      }
    }

    
    else if (this.selectedbuilding == '20') {
      switch (event) {
        case "MA.III 0": 
          this.planType = "MA.III 0";
          this.pdfSrc = "assets/images/plans/MAIII/GroundFloor/MA.III_0.pdf";
          this.blocks = [
            { name: "30.GF.CorridorN", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/30.GF.CorridorN.pdf", className: 'GF_30_CorridorN', planType: 'MA.III 0' },
            { name: "30.GF.CorridorS", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/30.GF.CorridorS.pdf", className: 'GF_30_CorridorS', planType: 'MA.III 0' },
            { name: "31.0", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/31.0.pdf", className: 'GF_31_0', planType: 'MA.III 0' },
            { name: "60.0A", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0A.pdf", className: 'GF_60_0A', planType: 'MA.III 0' },
            { name: "60.0B", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0B.pdf", className: 'GF_60_0B', planType: 'MA.III 0' },
            { name: "60.0C", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0C.pdf", className: 'GF_60_0C', planType: 'MA.III 0' },
            { name: "60.0D", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0D.pdf", className: 'GF_60_0D', planType: 'MA.III 0' },
            { name: "60.0E", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0E.pdf", className: 'GF_60_0E', planType: 'MA.III 0' },
            { name: "60.0F", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0F.pdf", className: 'GF_60_0F', planType: 'MA.III 0' },
            { name: "60.0G", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0G.pdf", className: 'GF_60_0G', planType: 'MA.III 0' },
            { name: "60.0H", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0H.pdf", className: 'GF_60_0H', planType: 'MA.III 0' },
            { name: "60.0I", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0I.pdf", className: 'GF_60_0I', planType: 'MA.III 0' },
            { name: "60.0J", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0J.pdf", className: 'GF_60_0J', planType: 'MA.III 0' },
            { name: "60.0K", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0K.pdf", className: 'GF_60_0K', planType: 'MA.III 0' },
            { name: "60.0L", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0L.pdf", className: 'GF_60_0L', planType: 'MA.III 0' },
            { name: "60.0M", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0M.pdf", className: 'GF_60_0M', planType: 'MA.III 0' },
            { name: "60.0N", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0N.pdf", className: 'GF_60_0N', planType: 'MA.III 0' },
            { name: "60.0P", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0P.pdf", className: 'GF_60_0P', planType: 'MA.III 0' },
            { name: "60.0Q", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0Q.pdf", className: 'GF_60_0Q', planType: 'MA.III 0' },
            { name: "60.0R", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0R.pdf", className: 'GF_60_0R', planType: 'MA.III 0' },
            { name: "60.0S", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0S.pdf", className: 'GF_60_0S', planType: 'MA.III 0' },
            { name: "60.0T", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/60.0T.pdf", className: 'GF_60_0T', planType: 'MA.III 0' },
            { name: "BS3.0", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/BS3.0.pdf", className: 'GF_BS3_0', planType: 'MA.III 0' },
            { name: "FS5.0", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/FS5.0.pdf", className: 'GF_FS5_0', planType: 'MA.III 0' },
            { name: "FS6.0", pdfSrc: "assets/images/plans/MAIII/GroundFloor/Zones/FS6.0.pdf", className: 'GF_FS6_0', planType: 'MA.III 0' },
          ]
          break;
          case "MA.III 1":
            this.planType = "MA.III 1";
            this.pdfSrc = "assets/images/plans/MAIII/FirstFloor/MA.III_1.pdf";
            this.blocks = [
              { name: "30.FF.CorridorN", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/30.FF.CorridorN.pdf", className: 'FF_30_CorridorN', planType: 'MA.III 1' },
              { name: "30.FF.CorridorS", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/30.FF.CorridorS.pdf", className: 'FF_30_CorridorS', planType: 'MA.III 1' },
              { name: "60.1A", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1A.pdf", className: 'FF_60_1A', planType: 'MA.III 1' },
              { name: "60.1C", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1C.pdf", className: 'FF_60_1C', planType: 'MA.III 1' },
              { name: "60.1D", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1D.pdf", className: 'FF_60_1D', planType: 'MA.III 1' },
              { name: "60.1E", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1E.pdf", className: 'FF_60_1E', planType: 'MA.III 1' },
              { name: "60.1F", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1F.pdf", className: 'FF_60_1F', planType: 'MA.III 1' },
              { name: "60.1G", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1G.pdf", className: 'FF_60_1G', planType: 'MA.III 1' },
              { name: "60.1H", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1H.pdf", className: 'FF_60_1H', planType: 'MA.III 1' },
              { name: "60.1I", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1I.pdf", className: 'FF_60_1I', planType: 'MA.III 1' },
              { name: "60.1J", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1J.pdf", className: 'FF_60_1J', planType: 'MA.III 1' }, 
              { name: "60.1L", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1L.pdf", className: 'FF_60_1L', planType: 'MA.III 1' },
              { name: "60.1M", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1M.pdf", className: 'FF_60_1M', planType: 'MA.III 1' },
              { name: "60.1N", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/60.1N.pdf", className: 'FF_60_1N', planType: 'MA.III 1' },   
              { name: "BS3.1", pdfSrc: "assets/images/plans/MAIII/FirstFloor/Zones/BS3.1.pdf", className: 'FF_BS3_1', planType: 'MA.III 1' },
            ]
            break;
            case "MA.III 2":
              this.planType = "MA.III 2";
              this.pdfSrc = "assets/images/plans/MAIII/SecondFloor/MA.III_2.pdf";
              this.blocks = [
                { name: "60.2A.1", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2A.1.pdf", className: 'SF_60_2A_1', planType: 'MA.III 2' },
                { name: "60.2A.2", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2A.2.pdf", className: 'SF_60_2A_2', planType: 'MA.III 2' },
                { name: "60.2A.3", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2A.3.pdf", className: 'SF_60_2A_3', planType: 'MA.III 2' },
                { name: "60.2B", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2B.pdf", className: 'SF_60_2B', planType: 'MA.III 2' },
                { name: "60.2C", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2C.pdf", className: 'SF_60_2C', planType: 'MA.III 2' },
                { name: "60.2D", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2D.pdf", className: 'SF_60_2D', planType: 'MA.III 2' },
                { name: "60.2E", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2E.pdf", className: 'SF_60_2E', planType: 'MA.III 2' },
                { name: "60.2F", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/60.2F.pdf", className: 'SF_60_2F', planType: 'MA.III 2' },
                { name: "BS3.2", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/BS3.2.pdf", className: 'SF_BS3_2', planType: 'MA.III 2' },
                { name: "FS5.2", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/FS5.2.pdf", className: 'SF_FS5_2', planType: 'MA.III 2' },
                { name: "FS6.2", pdfSrc: "assets/images/plans/MAIII/SecondFloor/Zones/FS6.2.pdf", className: 'SF_FS6_2', planType: 'MA.III 2' },
              ]
              break;
              case "MA.III 3":
                this.planType = "MA.III 3";
                this.pdfSrc = "assets/images/plans/MAIII/ThirdFloor/MA.III_3.pdf";
                this.blocks = [
                  { name: "60.3A", pdfSrc: "assets/images/plans/MAIII/ThirdFloor/Zones/60.3A.pdf", className: 'TF_60_3A', planType: 'MA.III 3' },
                   ]
                break;
                case "MA.III R":
                  this.planType = "MA.III R";
                  this.pdfSrc = "assets/images/plans/MAIII/Roof/MA.III_R.pdf";
                  this.blocks = [
                    { name: "MA.III_R", pdfSrc: "assets/images/plans/MAIII/Roof/MA.III_R.pdf", className: 'III_RF_R', planType: 'MA.III R' },
                  ]
                  break;
        default:
          break;
      }
    }




    // this.spinner = true;
    this.selectedfloor = event;
    this.Requestdata.Floor_Id = event;
    // this.nofloorselected = false;
    // this.floors.forEach((x) => {
    //   if (x == event) {
    //     this.RequestForm.controls["FloorName"].setValue(x["floor_status"]);
    //   }
    // });
    this.RequestForm.controls["FloorName"].setValue(event);
    this.FloorMain = event;
    console.log(this.FloorMain, "For Test")
    this.requestsserivies.GetAllRoomsbyid(event).subscribe((res) => {
      this.spinner = false;
      this.RoomsList = res["data"];
    });

    this.nobuildingmselect = false;
    this.name = "Room";
  }

  onFloorPlanNew(event, planValNew) {
    console.log(planValNew);
    console.log("Event", event)
    this.planSelectedBlocks.push(planValNew)

  }

  onFloorPlan() {
    let currentdate = config.getDenmarkTime.date();
    this.RequestForm.controls["Requestdate"].setValue(currentdate);
    this.RequestForm.controls["Companyname"].setValue(
      "M3 North"
    );
    // let blocks = this.selectFloorBlocks.map(item =>  {
    //   item.selectedBlock.forEach(element => {
    //     element.value
    //   })
    // })
    // console.log(blocks, "blocks")
    let blocks = this.selectFloorBlocks.reduce((acc, item) => {
      const values = item.selectedBlock.filter(element => element.isSelected).map(element => element.value);;
      console.log(values, "values")
      return acc.concat(values);

    }, []);
    console.log(blocks, "blocks");

    if (this.selectedbuilding == '9') {
      switch (this.FloorMain) {
        case "LK1":
          this.FloorOrdinates = this.LK1;
          // console.log(this.FloorOrdinates, "tessssst");
          break;

        case "L00":
          this.FloorOrdinates = this.L00;
          break;

        case "L01":
          this.FloorOrdinates = this.L01;
          break;

        case "L02":
          this.FloorOrdinates = this.L02;
          break;

        case "L03":
          this.FloorOrdinates = this.L03;
          break;

        case "L04":
          this.FloorOrdinates = this.L04;
          break;

        case "L05":
          this.FloorOrdinates = this.L05;
          break;

        case "L06":
          this.FloorOrdinates = this.L06;
          break;

        case "L07":
          this.FloorOrdinates = this.L07;
          break;

        case "L08":
          this.FloorOrdinates = this.L08;
          break;

        case "LTA":
          this.FloorOrdinates = this.LTA;
          break;
      }
    }
    else if (this.selectedbuilding == '10') {
      switch (this.FloorMain) {
        case "LK1":
          this.FloorOrdinates = this.B2LK1;
          // Testing
          // console.log(this.FloorOrdinates, "tessssst");
          break;

        case "L00":
          this.FloorOrdinates = this.B2L00;
          break;

        case "L01":
          this.FloorOrdinates = this.B2L01;
          break;

        case "L02":
          this.FloorOrdinates = this.B2L02;
          break;

        case "L03":
          this.FloorOrdinates = this.B2L03;
          break;

        case "L04":
          this.FloorOrdinates = this.B2L04;
          break;

        case "L05":
          this.FloorOrdinates = this.B2L05;
          break;

        case "L06":
          this.FloorOrdinates = this.B2L06;
          break;

        case "L07":
          this.FloorOrdinates = this.B2L07;
          break;

        case "L08":
          this.FloorOrdinates = this.B2L08;
          break;
      }
    }
    else if (this.selectedbuilding == '11') {
      switch (this.FloorMain) {
        case "L00A":
          this.FloorOrdinates = this.B6L00A;
          // Testing
          // console.log(this.FloorOrdinates, "tessssst");
          break;

        case "L00B":
          this.FloorOrdinates = this.B6L00B;
          break;

        case "L01A":
          this.FloorOrdinates = this.B6L01A;
          break;

        case "L01B":
          this.FloorOrdinates = this.B6L01B;
          break;

        case "L02A":
          this.FloorOrdinates = this.B6L02A;
          break;

        case "L02B":
          this.FloorOrdinates = this.B6L02B;
          break;

        case "L03A":
          this.FloorOrdinates = this.B6L03A;
          break;

        case "L03B":
          this.FloorOrdinates = this.B6L03B;
          break;

        case "L04":
          this.FloorOrdinates = this.B6L04;
          break;

        case "L05":
          this.FloorOrdinates = this.B6L05;
          break;

        case "L06":
          this.FloorOrdinates = this.B6L06;
          break;

        case "L07":
          this.FloorOrdinates = this.B6L07;
          break;

        case "L08":
          this.FloorOrdinates = this.B6L08;
          break;

        case "L09":
          this.FloorOrdinates = this.B6L09;
          break;

        case "LK1A":
          this.FloorOrdinates = this.B6LK1A;
          break;

        case "LK1B":
          this.FloorOrdinates = this.B6LK1B;
          break;
      }
    }
    else if (this.selectedbuilding == '12') {
      switch (this.FloorMain) {
        case "L00":
          this.FloorOrdinates = this.B8L00;
          // Testing
          // console.log(this.FloorOrdinates, "tessssst");
          break;

        case "L01":
          this.FloorOrdinates = this.B8L01;
          break;

        case "L02":
          this.FloorOrdinates = this.B8L02;
          break;

        case "L03":
          this.FloorOrdinates = this.B8L03;
          break;

        case "L04":
          this.FloorOrdinates = this.B8L04;
          break;

        case "L05":
          this.FloorOrdinates = this.B8L05;
          break;

        case "L06":
          this.FloorOrdinates = this.B8L06;
          break;

        case "L07":
          this.FloorOrdinates = this.B8L07;
          break;

        case "L08":
          this.FloorOrdinates = this.B8L08;
          break;

        case "L09":
          this.FloorOrdinates = this.B8L09;
          break;
        case "LK1":
          this.FloorOrdinates = this.B8LK1;
          break;

      }
    }

    else {
      switch (this.FloorMain) {
        case "JG":
          this.FloorOrdinates = this.JGzones;
          // Testing
          // console.log(this.FloorOrdinates, "tessssst");
          break;

      }
    }
    // console.log("block", this.planSelectedBlocks)
    // this.RequestForm.controls["Room"].setValue(this.planSelectedBlocks);
    this.RequestForm.controls["Room"].setValue(blocks);
    this.isnewrequestcreated = this.selectedbuilding && this.selectedfloor && blocks?.length > 0 ? true : false;
    // console.log("form data", this.RequestForm.value);
  }
  Getselectedroomitem(event) {
    console.log(event);
    this.RoomsList.forEach((x) => {
      if (x["room_id"] == event) {
        this.Rooms.push(x);
      }
    });
    this.selectedroom = event.toString();
    let currentdate = config.getDenmarkTime.date();
    this.RequestForm.controls["Requestdate"].setValue(currentdate);
    this.RequestForm.controls["Companyname"].setValue(
      "Novo Nordisk Project Team"
    );
    //this.RequestForm.controls['Status'].setValue('Active');
    this.isnewrequestcreated = true;

    this.RequestForm.controls["Room"].setValue(this.selectedroom.split(","));
    // this.filteredRooms = this.RequestForm.controls["Room"].valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => fruit ? this._roomsfilter(fruit) : this.RoomsList.slice()));
    // this.GetAllSubContractorsData();
  }

  Getselectedsubcntrsteams(event) {
    this.TeamsSubDto.subcontId = event;
    this.teamservices.GetAllTeamsBySubId(this.TeamsSubDto).subscribe((res) => {
      this.Teams = res["data"] || [];
      if (this.editform == true && this.Teams.length > 0) {
        this.Teams.forEach((x) => {
          if (x["id"] == this.data["payload"]["teamId"]) {
            this.RequestForm.controls["Team"].setValue(x["id"]);
            this.GetEmployees(Number.parseInt(x["id"]));
          }
        });
      }
    });

    this.empservice
      .GetAllEmployeesBySubContrId(this.TeamsSubDto.subcontId)
      .subscribe((res) => {
        let emps = [];
        res["data"].forEach((x) => {
          emps.push(x);
          console.log(emps)
        });
        this.BADGENUMBERS = emps;
      });
  }

  Getselectedcmtitem(event) {
    if (event === "1") {
      this.iscmsyes = true;
    } else {
      this.iscmsyes = false;
    }
  }
  GetselectedHOTWORKitem(event) {
    if (event == 1) {
      this.hotWorkHeight = 500;
      this.ishotworkyes = true;
    } else {
      this.hotWorkHeight = 100;
      this.ishotworkyes = false;
    }
  }

  GetselectedOtherCondition(event) {
    console.log("other", event.target.value)
    if (event == 1) {
      this.otherConditionHeight = 500;
      this.isOtherConditionyes = true;
    } else {
      this.otherConditionHeight = 100;
      this.isOtherConditionyes = false;
    }
  }
  GetselectedNEWHOTWORKitem(event) {
    if (event == 1) {
      this.isnewhotworkyes = true;
    } else {
      this.isnewhotworkyes = false;
    }
  }

  GetselectedElectricalitem(event) {
    if (event == 1) {
      this.electricalHeight = 500;
      this.iselectricalyes = true;
    } else {
      this.electricalHeight = 100;
      this.iselectricalyes = false;
    }
  }

  GetselectedHazardousitem(event) {
    if (event == 1) {
      this.hazardousHeight = 500;
      this.ishazardousyes = true;
    } else {
      this.hazardousHeight = 100;
      this.ishazardousyes = false;
    }
  }

  GetselectedTestingitem(event) {
    if (event == 1) {
      this.testingHeight = 500;
      this.istestingyes = true;
    } else {
      this.testingHeight = 100;
      this.istestingyes = false;
    }
  }

  GetselectedHeightsitem(event) {
    if (event == 1) {
      this.HeightsHeight = 500;
      this.isHeightsyes = true;
    } else {
      this.HeightsHeight = 100;
      this.isHeightsyes = false;
    }
  }

  GetselectedConfinedSpacesitem(event) {
    if (event == 1) {
      this.ConfinedsHeight = 500;
      this.isConfinedsyes = true;
    } else {
      this.ConfinedsHeight = 100;
      this.isConfinedsyes = false;
    }
  }

  GetselectedAtexAreaitem(event) {
    if (event == 1) {
      this.AtexAreaHeight = 500;
      this.isAtexAreayes = true;
    } else {
      this.AtexAreaHeight = 100;
      this.isAtexAreayes = false;
    }
  }


  GetselectedFacilitiesitem(event) {
    if (event == 1) {
      this.FacilitiesLotoHeight = 500;
      this.isFacilitiesLotoyes = true;
    } else {
      this.FacilitiesLotoHeight = 100;
      this.isFacilitiesLotoyes = false;
    }
  }

  GetselectedExcavationWorksitem(event) {
    if (event == 1) {
      this.ExcavationWorksHeight = 500;
      this.isExcavationWorksyes = true;
    } else {
      this.ExcavationWorksHeight = 100;
      this.isExcavationWorksyes = false;
    }
  }

  GetselectedCraneLiftingitem(event) {
    if (event == 1) {
      this.CraneLiftingHeight = 500;
      this.isCraneLiftingyes = true;
    } else {
      this.CraneLiftingHeight = 100;
      this.isCraneLiftingyes = false;
    }
  }

  GetselectedPoweronitem(event) {
    if (event == 1) {
      this.PoweronHeight = 500;
      this.isPoweronyes = true;
    } else {
      this.PoweronHeight = 100;
      this.isPoweronyes = false;
    }
  }

    GetselectedPressurizationitem(event) {
    if (event == 1) {
      this.PressurizationHeight = 500;
      this.isPressurizationyes = true;
    } else {
      this.PressurizationHeight = 100;
      this.isPressurizationyes = false;
    }
  }

  GetselectedLOTOPROCEDUREitem(event) {
    if (event === "1") {
      this.isLOTOPROCEDUREyes = true;
    } else {
      this.isLOTOPROCEDUREyes = false;
    }
  }

  SaveasDraft(statusdata) {
            (Object as any).keys(this.RequestForm.controls).forEach((control) => {
      this.RequestForm.get(`${control}`).updateValueAndValidity();
      this.RequestForm.get(`${control}`).markAsTouched();
    });
      this.Requestdata.Request_status = "Draft";
    this.CreateDraft();
    //this.requestsserivies.CreateNewRequest()
  }


    CreateDraft() {
    this.spinner = true;
    // var badarray = [];
    var roomoarr = [];
    // this.Badges.forEach(x => {
    //   badarray.push(x["badgeId"]);
    // });
    this.Rooms.forEach((x) => {
      roomoarr.push(x["room_id"]);
    });

    var today = moment.tz("Europe/Copenhagen");
    this.CurrenttimeNow = today.format('HH:mm:ss');
    console.log("Time now", this.CurrenttimeNow)

    const [currentDenmarkDate, currentDenmarkTime] = [
      ...config.Denmarktz.split(" "),
    ];

    console.log(currentDenmarkDate)
    console.log(currentDenmarkTime)

    this.Requestdata.denmark_time = config.getDenmarkTime.full();
    // this.Requestdata.denmark_date = currentDenmarkDate;


    this.Requestdata.Activity = this.RequestForm.controls["Activity"].value;

    // this.Requestdata.Badge_Numbers = this.RequestForm.controls["BADGENUMBER"].value;
    // this.Requestdata.Badge_Numbers = badarray.toString();

    this.Requestdata.Request_Date =
      this.RequestForm.controls["Requestdate"].value;
    this.Requestdata.Company_Name =
      this.RequestForm.controls["Companyname"].value;
    this.Requestdata.Sub_Contractor_Id =
      this.RequestForm.controls["SubContractor"].value;
    this.Requestdata.Foreman = this.RequestForm.controls["Foreman"].value;
    this.Requestdata.Foreman_Phone_Number =
      this.RequestForm.controls["ForemanPhone"].value;
    // this.Requestdata.Type_Of_Activity_Id=this.RequestForm.controls["TypeActivity"].value;
    this.Requestdata.Type_Of_Activity_Id =
      this.RequestForm.controls["TypeActivity"].value;

    this.Requestdata.electrical_works =
        this.RequestForm.controls["electrical_works"].value.toString();
    this.Requestdata.mechanical_works =
        this.RequestForm.controls["mechanical_works"].value.toString();

     this.Requestdata.pressure_pneumatic = this.RequestForm.controls["pressure_pneumatic"].value;
      this.Requestdata.pressure_hydrostatic = this.RequestForm.controls["pressure_hydrostatic"].value;
       this.Requestdata.mc_number_text = this.RequestForm.controls["mc_number_text"].value;
       this.Requestdata.work_type = this.RequestForm.controls["work_type"].value;

    // let workdate = this.datePipe.transform(
    //   this.RequestForm.controls["Startdate"].value,
    //   "yyyy-MM-dd"
    // );

    // this.Requestdata.Working_Date = workdate;
    let startDateValue = this.RequestForm.controls["Startdate"].value;
    // Check if the start date exists and is valid
    let workdate = startDateValue != '0000-00-00' ? this.datePipe.transform(startDateValue, "yyyy-MM-dd")
      : null;
      let newDate = this.RequestForm.controls["newWorkDate"].value;
      let newdate = newDate != '0000-00-00' ? this.datePipe.transform(newDate, "yyyy-MM-dd")
        : null;
      this.Requestdata.night_shift = this.RequestForm.controls["night_shift"].value;
      this.Requestdata.new_date = newdate;
      this.Requestdata.new_end_time = this.RequestForm.controls["new_end_time"].value;  
    this.Requestdata.Working_Date = workdate;
    this.Requestdata.Start_Time = this.RequestForm.controls["StartTime"].value;
    this.Requestdata.End_Time = this.RequestForm.controls["EndTime"].value;
    //this.Requestdata.Site_Id = this.RequestForm.controls["Site"].value;
    this.Requestdata.building_name = this.RequestForm.controls["Building"].value;
    this.Requestdata.Room_Type = this.RequestForm.controls["FloorName"].value;
    this.Requestdata.Room_Nos = this.RequestForm.controls["Room"].value.toString();
    this.Requestdata.permit_type = this.RequestForm.controls["permit_type"].value;
    // roomoarr.toString();

    // this.Requestdata.Room_Type = this.RequestForm.controls["RoomType"].value;
    // this.Requestdata.Crane_Requested =
    //   this.RequestForm.controls["CMTdata"].value;
    this.Requestdata.Crane_Number = this.RequestForm.controls["CmtValue"].value;
    this.Requestdata.Tools = this.RequestForm.controls["Tools"].value;
    this.Requestdata.Machinery = this.RequestForm.controls["Machinery"].value;
    this.Requestdata.Hot_work = this.RequestForm.controls["HOTWORK"].value;

    this.Requestdata.rams_number = this.RequestForm.controls["RAMSNumber"].value;

    this.Requestdata.name_of_the_fire_watcher = this.RequestForm.controls["fireWatcher"].value;
    this.Requestdata.phone_number_of_fire_watcher = this.RequestForm.controls["fireWatcherNumber"].value;

    this.Requestdata.tasks_in_progress_in_the_area = this.RequestForm.controls["floatLabel1"].value;
    // this.Requestdata.account_during_the_work = this.RequestForm.controls["floatLabel2"].value;
    this.Requestdata.lighting_sufficiently = this.RequestForm.controls["floatLabel3"].value;
    this.Requestdata.spesific_risks_based_on_task = this.RequestForm.controls["floatLabel4"].value;
    this.Requestdata.work_environment_safety_ensured = this.RequestForm.controls["floatLabel5"].value;
    this.Requestdata.course_of_action_in_emergencies = this.RequestForm.controls["floatLabel6"].value;

    this.Requestdata.fire_watch_establish = this.RequestForm.controls["floatLabel7"].value;
    this.Requestdata.combustible_material = this.RequestForm.controls["floatLabel8"].value;
    this.Requestdata.safety_measures = this.RequestForm.controls["floatLabel9"].value;
    this.Requestdata.extinguishers_and_fire_blanket = this.RequestForm.controls["floatLabel10"].value;

    this.Requestdata.welding_activitiy = this.RequestForm.controls["NEWHOTWORK"].value;
    this.Requestdata.heat_treatment = this.RequestForm.controls["NEWHOTWORK1"].value;
    this.Requestdata.air_extraction_be_established = this.RequestForm.controls["NEWHOTWORK2"].value;

    // new fields added
    // this.Requestdata.new_sub_contractor = this.RequestForm.controls["NEWHOTWORK2"].value;
    this.Requestdata.affecting_other_contractors = this.RequestForm.controls["floatLabel11"].value;
    this.Requestdata.other_conditions = this.RequestForm.controls["floatLabel12"].value;
    this.Requestdata.lighting_begin_work = this.RequestForm.controls["floatLabel13"].value;
    this.Requestdata.specific_risks = this.RequestForm.controls["floatLabel14"].value;
    this.Requestdata.environment_ensured = this.RequestForm.controls["floatLabel15"].value;
    this.Requestdata.course_of_action = this.RequestForm.controls["floatLabel16"].value;

    // electrical system
    this.Requestdata.working_on_electrical_system = this.RequestForm.controls["electricalSystem"].value;
    this.Requestdata.responsible_for_the_informed = this.RequestForm.controls["floatLabel17"].value;
    this.Requestdata.de_energized = this.RequestForm.controls["floatLabel18"].value;
    this.Requestdata.if_no_loto = this.RequestForm.controls["floatLabel19"].value;
    this.Requestdata.do_risk_assessment = this.RequestForm.controls["floatLabel20"].value;
    this.Requestdata.if_yes_loto = this.RequestForm.controls["floatLabel21"].value;
    this.Requestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value;
  //   this.Requestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value?.toString().trim() === "" 
  // ? 0 
  // : this.RequestForm.controls["floatLabel22"].value;
    this.Requestdata.electrician_certification = this.RequestForm.controls["floatLabel23"].value;

       // commission fields of electrical systems
    this.Requestdata.line_walk = this.RequestForm.controls["floatLabel102"].value;
    this.Requestdata.pressure_test_coordinated = this.RequestForm.controls["floatLabel103"].value;
    this.Requestdata.pipework_mic = this.RequestForm.controls["floatLabel104"].value;
    this.Requestdata.loto_plan_attached = this.RequestForm.controls["floatLabel105"].value;
    this.Requestdata.exclusion_zone_calculated = this.RequestForm.controls["floatLabel106"].value;
    this.Requestdata.pneumatic_hydrostatic = this.RequestForm.controls["floatLabel107"].value;
    this.Requestdata.pressure_of_the_test = this.RequestForm.controls["floatLabel108"].value;
    this.Requestdata.safety_valves_calibrated = this.RequestForm.controls["floatLabel109"].value;


    // working_hazardious

    this.Requestdata.working_hazardious_substen = this.RequestForm.controls["HAZARDOUS"].value;
    this.Requestdata.relevant_mal = this.RequestForm.controls["floatLabel24"].value;
    this.Requestdata.msds = this.RequestForm.controls["floatLabel25"].value;
    this.Requestdata.equipment_taken_account = this.RequestForm.controls["floatLabel26"].value;
    this.Requestdata.ventilation = this.RequestForm.controls["floatLabel27"].value;
    this.Requestdata.hazardaus_substances = this.RequestForm.controls["floatLabel28"].value;
    this.Requestdata.storage_and_disposal = this.RequestForm.controls["floatLabel29"].value;
    this.Requestdata.reachable_case = this.RequestForm.controls["floatLabel30"].value;
    this.Requestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value;
  //   this.Requestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value?.toString().trim() === "" 
  // ? 0 
  // : this.RequestForm.controls["floatLabel31"].value;

    //  <!-- testing start -->

    this.Requestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value;
  //   this.Requestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value?.toString().trim() === "" 
  // ? 0 
  // : this.RequestForm.controls["TESTINGs"].value;
    this.Requestdata.transfer_of_palnt = this.RequestForm.controls["floatLabel32"].value;
    this.Requestdata.area_drained = this.RequestForm.controls["floatLabel33"].value;
    this.Requestdata.area_depressurised = this.RequestForm.controls["floatLabel34"].value;
    this.Requestdata.area_flused = this.RequestForm.controls["floatLabel35"].value;
    this.Requestdata.tank_area_container = this.RequestForm.controls["floatLabel36"].value;
    this.Requestdata.system_free_for_dust = this.RequestForm.controls["floatLabel37"].value;
    this.Requestdata.loto_plan_submitted = this.RequestForm.controls["floatLabel38"].value;

    // <!-- height start -->

    this.Requestdata.working_at_height = this.RequestForm.controls["WORKHEIGHT"].value;
    this.Requestdata.segragated_demarkated = this.RequestForm.controls["segragated_demarkated"].value;
    this.Requestdata.lanyard_attachments = this.RequestForm.controls["floatLabel39"].value;
    this.Requestdata.rescue_plan = this.RequestForm.controls["floatLabel40"].value;
    this.Requestdata.avoid_hazards = this.RequestForm.controls["floatLabel41"].value;
    this.Requestdata.height_training = this.RequestForm.controls["floatLabel42"].value;
    this.Requestdata.supervision = this.RequestForm.controls["floatLabel43"].value;
    this.Requestdata.shock_absorbing = this.RequestForm.controls["floatLabel44"].value;
    this.Requestdata.height_equipments = this.RequestForm.controls["floatLabel45"].value;
    this.Requestdata.vertical_life = this.RequestForm.controls["floatLabel46"].value;
    this.Requestdata.secured_falling = this.RequestForm.controls["floatLabel47"].value;
    this.Requestdata.dropped_objects = this.RequestForm.controls["floatLabel48"].value;
    this.Requestdata.safe_acces = this.RequestForm.controls["floatLabel49"].value;
    this.Requestdata.weather_acceptable = this.RequestForm.controls["floatLabel50"].value;

    // working_confined_spaces

    this.Requestdata.working_confined_spaces = this.RequestForm.controls["CONFINEDSPACE"].value;
    this.Requestdata.vapours_gases = this.RequestForm.controls["floatLabel51"].value;
    this.Requestdata.lel_measurement = this.RequestForm.controls["floatLabel52"].value;
    this.Requestdata.all_equipment = this.RequestForm.controls["floatLabel53"].value;
    this.Requestdata.exit_conditions = this.RequestForm.controls["floatLabel54"].value;
    this.Requestdata.communication_emergency = this.RequestForm.controls["floatLabel55"].value;
    this.Requestdata.rescue_equipments = this.RequestForm.controls["floatLabel56"].value;
    this.Requestdata.space_ventilation = this.RequestForm.controls["floatLabel57"].value;
    this.Requestdata.oxygen_meter = this.RequestForm.controls["floatLabel58"].value;

    // work_in_atex_area

    this.Requestdata.work_in_atex_area = this.RequestForm.controls["ATEXAREA"].value;
    this.Requestdata.ex_area_downgraded = this.RequestForm.controls["floatLabel59"].value;
    this.Requestdata.atmospheric_tester = this.RequestForm.controls["floatLabel60"].value;
    this.Requestdata.flammable_materials = this.RequestForm.controls["floatLabel61"].value;
    this.Requestdata.potential_explosive = this.RequestForm.controls["floatLabel62"].value;
    this.Requestdata.oxygen_meter_confined_spaces = this.RequestForm.controls["floatLabel63"].value;

    // <!-- FACILITIES LOTO start -->

    this.Requestdata.securing_facilities = this.RequestForm.controls["FACILITIESLOTO"].value;
    this.Requestdata.loto_facilities = this.RequestForm.controls["floatLabel64"].value;
    this.Requestdata.system_depressurised = this.RequestForm.controls["floatLabel65"].value;
    this.Requestdata.system_drained = this.RequestForm.controls["system_drained"].value;
    this.Requestdata.passive_pause_other = this.RequestForm.controls["floatLabel67"].value;
    this.Requestdata.electricity_have_insulation = this.RequestForm.controls["floatLabel68"].value;
    this.Requestdata.covered_or_secured = this.RequestForm.controls["floatLabel69"].value;
    this.Requestdata.people_electrician_certification = this.RequestForm.controls["floatLabel70"].value;
    this.Requestdata.people_electrician_certification = this.RequestForm.controls["floatLabel71"].value;

    // excavation_works

    this.Requestdata.excavation_works = this.RequestForm.controls["ExcavationWorks"].value;
    this.Requestdata.excavation_segregated = this.RequestForm.controls["floatLabel71"].value;
    this.Requestdata.nn_standards = this.RequestForm.controls["floatLabel72"].value;
    this.Requestdata.excavation_shoring = this.RequestForm.controls["excavation_shoring"].value;
    this.Requestdata.danish_regulation = this.RequestForm.controls["floatLabel74"].value;
    this.Requestdata.safe_access_and_egress = this.RequestForm.controls["floatLabel75"].value;
    this.Requestdata.correctly_sloped = this.RequestForm.controls["floatLabel76"].value;
    this.Requestdata.inspection_dates = this.RequestForm.controls["floatLabel77"].value;
    this.Requestdata.marked_drawings = this.RequestForm.controls["floatLabel78"].value;
    this.Requestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value;
    // this.Requestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value;

    // using_cranes_or_lifting

    this.Requestdata.using_cranes_or_lifting = this.RequestForm.controls["CraneLifting"].value;
    this.Requestdata.appointed_person = this.RequestForm.controls["floatLabel80"].value;
    this.Requestdata.vendor_supplier = this.RequestForm.controls["floatLabel81"].value;
    this.Requestdata.lift_plan = this.RequestForm.controls["floatLabel82"].value;
    this.Requestdata.supplied_and_inspected = this.RequestForm.controls["floatLabel83"].value;
    this.Requestdata.legal_required_certificates = this.RequestForm.controls["floatLabel84"].value;
    this.Requestdata.prapared_lifting = this.RequestForm.controls["floatLabel85"].value;
    this.Requestdata.lifting_task_fenced = this.RequestForm.controls["floatLabel86"].value;
    this.Requestdata.overhead_risks = this.RequestForm.controls["floatLabel87"].value;

    // pressurization power on fields
    this.Requestdata.power_on = this.RequestForm.controls["Poweron"].value;
    this.Requestdata.responsible_for_the_area = this.RequestForm.controls["floatLabel88"].value;
    this.Requestdata.risk_assessment_done = this.RequestForm.controls["floatLabel89"].value;
    this.Requestdata.barriers_signage = this.RequestForm.controls["floatLabel90"].value;
    this.Requestdata.energized_been_tested = this.RequestForm.controls["floatLabel91"].value;
    this.Requestdata.punches_been_closed = this.RequestForm.controls["floatLabel92"].value;
    this.Requestdata.toct_checklist = this.RequestForm.controls["floatLabel93"].value;
    this.Requestdata.informed_aligned = this.RequestForm.controls["floatLabel94"].value;

        // pressurization fields
    this.Requestdata.pressurization = this.RequestForm.controls["Pressurization"].value;
    this.Requestdata.performed_approved = this.RequestForm.controls["floatLabel95"].value;
    this.Requestdata.flushing_approved = this.RequestForm.controls["floatLabel96"].value;
    this.Requestdata.mc_approved = this.RequestForm.controls["floatLabel97"].value;
    this.Requestdata.visual_inspection = this.RequestForm.controls["floatLabel98"].value;
    this.Requestdata.loto_plan_approved = this.RequestForm.controls["floatLabel99"].value;
    this.Requestdata.follow_media_code = this.RequestForm.controls["floatLabel100"].value;
    this.Requestdata.cq_safety_signs = this.RequestForm.controls["floatLabel101"].value;


    this.Requestdata.visible_clothing = this.RequestForm.controls["VisableClothing"].value;
    this.Requestdata.safety_shoes = this.RequestForm.controls["SafetyShoes"].value;
    this.Requestdata.helmet = this.RequestForm.controls["Helmet"].value;

    this.Requestdata.new_sub_contractor = this.RequestForm.controls["newSubContractor"].value;

    this.Requestdata.description_of_activity = this.RequestForm.controls["descriptActivity"].value;
    this.Requestdata.specific_gloves = this.RequestForm.controls["specific_gloves"].value;
    this.Requestdata.eye_protection = this.RequestForm.controls["eye_protection"].value;
    this.Requestdata.fall_protection = this.RequestForm.controls["fall_protection"].value;
    this.Requestdata.hearing_protection = this.RequestForm.controls["hearing_protection"].value;
    this.Requestdata.respiratory_protection = this.RequestForm.controls["respiratory_protection"].value;
    this.Requestdata.other_ppe = this.RequestForm.controls["other_ppe"].value;
    this.Requestdata.other_conditions_input = this.RequestForm.controls["other_conditions_input"].value;

    // this.Requestdata.Certified_Person =
    //   this.RequestForm.controls["CertifiedPerson"].value;
    this.Requestdata.LOTO_Procedure =
      this.RequestForm.controls["LOTOPROCEDURE"].value;
    this.Requestdata.LOTO_Number =
      this.RequestForm.controls["LOTONumber"].value;

    this.Requestdata.Power_Off_Required =
      this.RequestForm.controls["Poweroff"].value;
    this.Requestdata.Number_Of_Workers =
      this.RequestForm.controls["peopleinvalidcount"].value;
    this.Requestdata.Notes = this.RequestForm.controls["Note"].value;

    this.Requestdata.Badge_Numbers =
      this.RequestForm.controls["BADGENUMBER"].value.toString();
    console.log("Requestdata", this.Requestdata)

    this.Requestdata.rams_file = this.RequestForm.controls["rams_file"].value;

    let formData = new FormData();

    // for (const [key, value] of Object.entries(this.Requestdata)) {
    //   if (key != 'rams_file') {
    //     formData.append(key, value as string); // Ensure values are strings if needed
    //   }
    // }

    // console.log(this.RequestForm.controls["rams_file"].value)
    // console.log(this.Requestdata.rams_file)
    // formData.append("rams_file", this.Requestdata.rams_file)
    for (const [key, value] of Object.entries(this.Requestdata)) {
      if (key !== 'rams_file' && value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    }
    
    // Then: Append each file under same 'rams_file[]' field
    if (this.Requestdata.rams_file && this.Requestdata.rams_file.length > 0) {
      (this.Requestdata.rams_file as File[]).forEach((file: File) => {
        formData.append('rams_file[]', file);  // same field name again and again
      });
    }

    console.log(this.RequestForm.controls["rams_file"].value)
    console.log(this.Requestdata.rams_file)

    this.requestsserivies.CreateNewRequest(formData).subscribe(
      (res) => {
        this.spinner = false;
        this.openSnackBar("Request Created Successfully");
        this.route.navigateByUrl("/user/list-request");
      },
      (error) => {
        this.openSnackBar("Something went wrong. Plz try again later...");
      }
    );
  }


shouldShowElectricianCert(): boolean {
  return this.RequestForm.get('permit_type').value !== 'Commissioning';
}

selectedWorkType: string;

onWorkTypeChange() {
  // Reset electrical/mechanical works when work type changes
  this.RequestForm.patchValue({
    electrical_works: [],
    mechanical_works: []
  });
  this.cdr.detectChanges();
}

onPermitTypeChange() {
  // Reset work type and related fields when permit type changes
  this.RequestForm.patchValue({
    work_type: null,
    electrical_works: [],
    mechanical_works: []
  });
  this.cdr.detectChanges();
}

showElectricalWorks(): boolean {
  return this.RequestForm.get('work_type')?.value === 'Electrical Works' && 
  !this.shouldShowElectricianCert();
}

showMechanicalWorks(): boolean {
  return this.RequestForm.get('work_type')?.value === 'Mechanical Works' && 
  !this.shouldShowElectricianCert();
}

  CreateRequest() {
    this.spinner = true;
    // var badarray = [];
    var roomoarr = [];
    // this.Badges.forEach(x => {
    //   badarray.push(x["badgeId"]);
    // });
    this.Rooms.forEach((x) => {
      roomoarr.push(x["room_id"]);
    });

    var today = moment.tz("Europe/Copenhagen");
    this.CurrenttimeNow = today.format('HH:mm:ss');
    console.log("Time now", this.CurrenttimeNow)

    const [currentDenmarkDate, currentDenmarkTime] = [
      ...config.Denmarktz.split(" "),
    ];

    console.log(currentDenmarkDate)
    console.log(currentDenmarkTime)

    this.Requestdata.denmark_time = config.getDenmarkTime.full();
    // this.Requestdata.denmark_date = currentDenmarkDate;


    this.Requestdata.Activity = this.RequestForm.controls["Activity"].value;

    // this.Requestdata.Badge_Numbers = this.RequestForm.controls["BADGENUMBER"].value;
    // this.Requestdata.Badge_Numbers = badarray.toString();

    this.Requestdata.Request_Date =
      this.RequestForm.controls["Requestdate"].value;
    this.Requestdata.Company_Name =
      this.RequestForm.controls["Companyname"].value;
    this.Requestdata.Sub_Contractor_Id =
      this.RequestForm.controls["SubContractor"].value;
    this.Requestdata.Foreman = this.RequestForm.controls["Foreman"].value;
    this.Requestdata.Foreman_Phone_Number =
      this.RequestForm.controls["ForemanPhone"].value;
    // this.Requestdata.Type_Of_Activity_Id=this.RequestForm.controls["TypeActivity"].value;
    this.Requestdata.Type_Of_Activity_Id =
      this.RequestForm.controls["TypeActivity"].value;

    this.Requestdata.electrical_works =
        this.RequestForm.controls["electrical_works"].value.toString();
    this.Requestdata.mechanical_works =
        this.RequestForm.controls["mechanical_works"].value.toString();

     this.Requestdata.pressure_pneumatic = this.RequestForm.controls["pressure_pneumatic"].value;
      this.Requestdata.pressure_hydrostatic = this.RequestForm.controls["pressure_hydrostatic"].value;
       this.Requestdata.mc_number_text = this.RequestForm.controls["mc_number_text"].value;
       this.Requestdata.work_type = this.RequestForm.controls["work_type"].value;

    // let workdate = this.datePipe.transform(
    //   this.RequestForm.controls["Startdate"].value,
    //   "yyyy-MM-dd"
    // );

    // this.Requestdata.Working_Date = workdate;
    let startDateValue = this.RequestForm.controls["Startdate"].value;
    // Check if the start date exists and is valid
    let workdate = startDateValue != '0000-00-00' ? this.datePipe.transform(startDateValue, "yyyy-MM-dd")
      : null;
      let newDate = this.RequestForm.controls["newWorkDate"].value;
      let newdate = newDate != '0000-00-00' ? this.datePipe.transform(newDate, "yyyy-MM-dd")
        : null;
      this.Requestdata.night_shift = this.RequestForm.controls["night_shift"].value;
      this.Requestdata.new_date = newdate;
      this.Requestdata.new_end_time = this.RequestForm.controls["new_end_time"].value;  
    this.Requestdata.Working_Date = workdate;
    this.Requestdata.Start_Time = this.RequestForm.controls["StartTime"].value;
    this.Requestdata.End_Time = this.RequestForm.controls["EndTime"].value;
    //this.Requestdata.Site_Id = this.RequestForm.controls["Site"].value;
    this.Requestdata.building_name = this.RequestForm.controls["Building"].value;
    this.Requestdata.Room_Type = this.RequestForm.controls["FloorName"].value;
    this.Requestdata.Room_Nos = this.RequestForm.controls["Room"].value.toString();
    this.Requestdata.permit_type = this.RequestForm.controls["permit_type"].value;
    // roomoarr.toString();

    // this.Requestdata.Room_Type = this.RequestForm.controls["RoomType"].value;
    // this.Requestdata.Crane_Requested =
    //   this.RequestForm.controls["CMTdata"].value;
    this.Requestdata.Crane_Number = this.RequestForm.controls["CmtValue"].value;
    this.Requestdata.Tools = this.RequestForm.controls["Tools"].value;
    this.Requestdata.Machinery = this.RequestForm.controls["Machinery"].value;
    this.Requestdata.Hot_work = this.RequestForm.controls["HOTWORK"].value;

    this.Requestdata.rams_number = this.RequestForm.controls["RAMSNumber"].value;

    this.Requestdata.name_of_the_fire_watcher = this.RequestForm.controls["fireWatcher"].value;
    this.Requestdata.phone_number_of_fire_watcher = this.RequestForm.controls["fireWatcherNumber"].value;

    this.Requestdata.tasks_in_progress_in_the_area = this.RequestForm.controls["floatLabel1"].value || 0;
    // this.Requestdata.account_during_the_work = this.RequestForm.controls["floatLabel2"].value;
    this.Requestdata.lighting_sufficiently = this.RequestForm.controls["floatLabel3"].value || 0;
    this.Requestdata.spesific_risks_based_on_task = this.RequestForm.controls["floatLabel4"].value || 0;
    this.Requestdata.work_environment_safety_ensured = this.RequestForm.controls["floatLabel5"].value || 0;
    this.Requestdata.course_of_action_in_emergencies = this.RequestForm.controls["floatLabel6"].value || 0;

    this.Requestdata.fire_watch_establish = this.RequestForm.controls["floatLabel7"].value || 0;
    this.Requestdata.combustible_material = this.RequestForm.controls["floatLabel8"].value || 0;
    this.Requestdata.safety_measures = this.RequestForm.controls["floatLabel9"].value || 0;
    this.Requestdata.extinguishers_and_fire_blanket = this.RequestForm.controls["floatLabel10"].value || 0;

    this.Requestdata.welding_activitiy = this.RequestForm.controls["NEWHOTWORK"].value || 0;
    this.Requestdata.heat_treatment = this.RequestForm.controls["NEWHOTWORK1"].value || 0;
    this.Requestdata.air_extraction_be_established = this.RequestForm.controls["NEWHOTWORK2"].value || 0;

    // new fields added
    // this.Requestdata.new_sub_contractor = this.RequestForm.controls["NEWHOTWORK2"].value;
    this.Requestdata.affecting_other_contractors = this.RequestForm.controls["floatLabel11"].value || 0;
    this.Requestdata.other_conditions = this.RequestForm.controls["floatLabel12"].value || 0;
    this.Requestdata.lighting_begin_work = this.RequestForm.controls["floatLabel13"].value || 0;
    this.Requestdata.specific_risks = this.RequestForm.controls["floatLabel14"].value || 0;
    this.Requestdata.environment_ensured = this.RequestForm.controls["floatLabel15"].value || 0;
    this.Requestdata.course_of_action = this.RequestForm.controls["floatLabel16"].value || 0;

    // electrical system
    this.Requestdata.working_on_electrical_system = this.RequestForm.controls["electricalSystem"].value || 0;
    this.Requestdata.responsible_for_the_informed = this.RequestForm.controls["floatLabel17"].value || 0;
    this.Requestdata.de_energized = this.RequestForm.controls["floatLabel18"].value || 0;
    this.Requestdata.if_no_loto = this.RequestForm.controls["floatLabel19"].value || 0;
    this.Requestdata.do_risk_assessment = this.RequestForm.controls["floatLabel20"].value || 0;
    this.Requestdata.if_yes_loto = this.RequestForm.controls["floatLabel21"].value || 0;
    this.Requestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value || 0;
  //   this.Requestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value?.toString().trim() === "" 
  // ? 0 
  // : this.RequestForm.controls["floatLabel22"].value;
    this.Requestdata.electrician_certification = this.RequestForm.controls["floatLabel23"].value || 0;

       // commission fields of electrical systems
    this.Requestdata.line_walk = this.RequestForm.controls["floatLabel102"].value || 0;
    this.Requestdata.pressure_test_coordinated = this.RequestForm.controls["floatLabel103"].value || 0;
    this.Requestdata.pipework_mic = this.RequestForm.controls["floatLabel104"].value || 0;
    this.Requestdata.loto_plan_attached = this.RequestForm.controls["floatLabel105"].value || 0;
    this.Requestdata.exclusion_zone_calculated = this.RequestForm.controls["floatLabel106"].value || 0;
    this.Requestdata.pneumatic_hydrostatic = this.RequestForm.controls["floatLabel107"].value || 0;
    this.Requestdata.pressure_of_the_test = this.RequestForm.controls["floatLabel108"].value || 0;
    this.Requestdata.safety_valves_calibrated = this.RequestForm.controls["floatLabel109"].value || 0;


    // working_hazardious

    this.Requestdata.working_hazardious_substen = this.RequestForm.controls["HAZARDOUS"].value || 0;
    this.Requestdata.relevant_mal = this.RequestForm.controls["floatLabel24"].value || 0;
    this.Requestdata.msds = this.RequestForm.controls["floatLabel25"].value || 0;
    this.Requestdata.equipment_taken_account = this.RequestForm.controls["floatLabel26"].value || 0;
    this.Requestdata.ventilation = this.RequestForm.controls["floatLabel27"].value || 0;
    this.Requestdata.hazardaus_substances = this.RequestForm.controls["floatLabel28"].value || 0;
    this.Requestdata.storage_and_disposal = this.RequestForm.controls["floatLabel29"].value || 0;
    this.Requestdata.reachable_case = this.RequestForm.controls["floatLabel30"].value || 0;
    this.Requestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value || 0;
  //   this.Requestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value?.toString().trim() === "" 
  // ? 0 
  // : this.RequestForm.controls["floatLabel31"].value;

    //  <!-- testing start -->

    this.Requestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value || 0;
  //   this.Requestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value?.toString().trim() === "" 
  // ? 0 
  // : this.RequestForm.controls["TESTINGs"].value;
    this.Requestdata.transfer_of_palnt = this.RequestForm.controls["floatLabel32"].value || 0;
    this.Requestdata.area_drained = this.RequestForm.controls["floatLabel33"].value || 0;
    this.Requestdata.area_depressurised = this.RequestForm.controls["floatLabel34"].value || 0;
    this.Requestdata.area_flused = this.RequestForm.controls["floatLabel35"].value || 0;
    this.Requestdata.tank_area_container = this.RequestForm.controls["floatLabel36"].value || 0;
    this.Requestdata.system_free_for_dust = this.RequestForm.controls["floatLabel37"].value || 0;
    this.Requestdata.loto_plan_submitted = this.RequestForm.controls["floatLabel38"].value || 0;

    // <!-- height start -->

    this.Requestdata.working_at_height = this.RequestForm.controls["WORKHEIGHT"].value || 0;
    this.Requestdata.segragated_demarkated = this.RequestForm.controls["segragated_demarkated"].value || 0;
    this.Requestdata.lanyard_attachments = this.RequestForm.controls["floatLabel39"].value || 0;
    this.Requestdata.rescue_plan = this.RequestForm.controls["floatLabel40"].value || 0;
    this.Requestdata.avoid_hazards = this.RequestForm.controls["floatLabel41"].value || 0;
    this.Requestdata.height_training = this.RequestForm.controls["floatLabel42"].value || 0;
    this.Requestdata.supervision = this.RequestForm.controls["floatLabel43"].value || 0;
    this.Requestdata.shock_absorbing = this.RequestForm.controls["floatLabel44"].value || 0;
    this.Requestdata.height_equipments = this.RequestForm.controls["floatLabel45"].value || 0;
    this.Requestdata.vertical_life = this.RequestForm.controls["floatLabel46"].value || 0;
    this.Requestdata.secured_falling = this.RequestForm.controls["floatLabel47"].value || 0;
    this.Requestdata.dropped_objects = this.RequestForm.controls["floatLabel48"].value || 0;
    this.Requestdata.safe_acces = this.RequestForm.controls["floatLabel49"].value || 0;
    this.Requestdata.weather_acceptable = this.RequestForm.controls["floatLabel50"].value || 0;

    // working_confined_spaces

    this.Requestdata.working_confined_spaces = this.RequestForm.controls["CONFINEDSPACE"].value || 0;
    this.Requestdata.vapours_gases = this.RequestForm.controls["floatLabel51"].value || 0;
    this.Requestdata.lel_measurement = this.RequestForm.controls["floatLabel52"].value || 0;
    this.Requestdata.all_equipment = this.RequestForm.controls["floatLabel53"].value || 0;
    this.Requestdata.exit_conditions = this.RequestForm.controls["floatLabel54"].value || 0;
    this.Requestdata.communication_emergency = this.RequestForm.controls["floatLabel55"].value || 0;
    this.Requestdata.rescue_equipments = this.RequestForm.controls["floatLabel56"].value || 0;
    this.Requestdata.space_ventilation = this.RequestForm.controls["floatLabel57"].value || 0;
    this.Requestdata.oxygen_meter = this.RequestForm.controls["floatLabel58"].value || 0;

    // work_in_atex_area

    this.Requestdata.work_in_atex_area = this.RequestForm.controls["ATEXAREA"].value || 0;
    this.Requestdata.ex_area_downgraded = this.RequestForm.controls["floatLabel59"].value || 0;
    this.Requestdata.atmospheric_tester = this.RequestForm.controls["floatLabel60"].value || 0;
    this.Requestdata.flammable_materials = this.RequestForm.controls["floatLabel61"].value || 0;
    this.Requestdata.potential_explosive = this.RequestForm.controls["floatLabel62"].value || 0;
    this.Requestdata.oxygen_meter_confined_spaces = this.RequestForm.controls["floatLabel63"].value || 0;

    // <!-- FACILITIES LOTO start -->

    this.Requestdata.securing_facilities = this.RequestForm.controls["FACILITIESLOTO"].value || 0;
    this.Requestdata.loto_facilities = this.RequestForm.controls["floatLabel64"].value || 0;
    this.Requestdata.system_depressurised = this.RequestForm.controls["floatLabel65"].value || 0;
    this.Requestdata.system_drained = this.RequestForm.controls["system_drained"].value || 0;
    this.Requestdata.passive_pause_other = this.RequestForm.controls["floatLabel67"].value || 0;
    this.Requestdata.electricity_have_insulation = this.RequestForm.controls["floatLabel68"].value || 0;
    this.Requestdata.covered_or_secured = this.RequestForm.controls["floatLabel69"].value || 0;
    this.Requestdata.people_electrician_certification = this.RequestForm.controls["floatLabel70"].value || 0;
    this.Requestdata.people_electrician_certification = this.RequestForm.controls["floatLabel71"].value || 0;

    // excavation_works

    this.Requestdata.excavation_works = this.RequestForm.controls["ExcavationWorks"].value || 0;
    this.Requestdata.excavation_segregated = this.RequestForm.controls["floatLabel71"].value || 0;
    this.Requestdata.nn_standards = this.RequestForm.controls["floatLabel72"].value || 0;
    this.Requestdata.excavation_shoring = this.RequestForm.controls["excavation_shoring"].value || 0;
    this.Requestdata.danish_regulation = this.RequestForm.controls["floatLabel74"].value || 0;
    this.Requestdata.safe_access_and_egress = this.RequestForm.controls["floatLabel75"].value || 0;
    this.Requestdata.correctly_sloped = this.RequestForm.controls["floatLabel76"].value || 0;
    this.Requestdata.inspection_dates = this.RequestForm.controls["floatLabel77"].value || 0;
    this.Requestdata.marked_drawings = this.RequestForm.controls["floatLabel78"].value || 0;
    this.Requestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value || 0;
    // this.Requestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value;

    // using_cranes_or_lifting

    this.Requestdata.using_cranes_or_lifting = this.RequestForm.controls["CraneLifting"].value || 0;
    this.Requestdata.appointed_person = this.RequestForm.controls["floatLabel80"].value || 0;
    this.Requestdata.vendor_supplier = this.RequestForm.controls["floatLabel81"].value || 0;
    this.Requestdata.lift_plan = this.RequestForm.controls["floatLabel82"].value || 0;
    this.Requestdata.supplied_and_inspected = this.RequestForm.controls["floatLabel83"].value || 0;
    this.Requestdata.legal_required_certificates = this.RequestForm.controls["floatLabel84"].value || 0;
    this.Requestdata.prapared_lifting = this.RequestForm.controls["floatLabel85"].value || 0;
    this.Requestdata.lifting_task_fenced = this.RequestForm.controls["floatLabel86"].value || 0;
    this.Requestdata.overhead_risks = this.RequestForm.controls["floatLabel87"].value || 0;

    // pressurization power on fields
    this.Requestdata.power_on = this.RequestForm.controls["Poweron"].value || 0;
    this.Requestdata.responsible_for_the_area = this.RequestForm.controls["floatLabel88"].value || 0;
    this.Requestdata.risk_assessment_done = this.RequestForm.controls["floatLabel89"].value || 0;
    this.Requestdata.barriers_signage = this.RequestForm.controls["floatLabel90"].value || 0;
    this.Requestdata.energized_been_tested = this.RequestForm.controls["floatLabel91"].value || 0;
    this.Requestdata.punches_been_closed = this.RequestForm.controls["floatLabel92"].value || 0;
    this.Requestdata.toct_checklist = this.RequestForm.controls["floatLabel93"].value || 0;
    this.Requestdata.informed_aligned = this.RequestForm.controls["floatLabel94"].value || 0;

        // pressurization fields
    this.Requestdata.pressurization = this.RequestForm.controls["Pressurization"].value || 0;
    this.Requestdata.performed_approved = this.RequestForm.controls["floatLabel95"].value || 0;
    this.Requestdata.flushing_approved = this.RequestForm.controls["floatLabel96"].value || 0;
    this.Requestdata.mc_approved = this.RequestForm.controls["floatLabel97"].value || 0;
    this.Requestdata.visual_inspection = this.RequestForm.controls["floatLabel98"].value || 0;
    this.Requestdata.loto_plan_approved = this.RequestForm.controls["floatLabel99"].value || 0;
    this.Requestdata.follow_media_code = this.RequestForm.controls["floatLabel100"].value || 0;
    this.Requestdata.cq_safety_signs = this.RequestForm.controls["floatLabel101"].value || 0;


    this.Requestdata.visible_clothing = this.RequestForm.controls["VisableClothing"].value;
    this.Requestdata.safety_shoes = this.RequestForm.controls["SafetyShoes"].value;
    this.Requestdata.helmet = this.RequestForm.controls["Helmet"].value;

    this.Requestdata.new_sub_contractor = this.RequestForm.controls["newSubContractor"].value;

    this.Requestdata.description_of_activity = this.RequestForm.controls["descriptActivity"].value;
    this.Requestdata.specific_gloves = this.RequestForm.controls["specific_gloves"].value;
    this.Requestdata.eye_protection = this.RequestForm.controls["eye_protection"].value;
    this.Requestdata.fall_protection = this.RequestForm.controls["fall_protection"].value;
    this.Requestdata.hearing_protection = this.RequestForm.controls["hearing_protection"].value;
    this.Requestdata.respiratory_protection = this.RequestForm.controls["respiratory_protection"].value;
    this.Requestdata.other_ppe = this.RequestForm.controls["other_ppe"].value;
    this.Requestdata.other_conditions_input = this.RequestForm.controls["other_conditions_input"].value;

    // this.Requestdata.Certified_Person =
    //   this.RequestForm.controls["CertifiedPerson"].value;
    this.Requestdata.LOTO_Procedure =
      this.RequestForm.controls["LOTOPROCEDURE"].value;
    this.Requestdata.LOTO_Number =
      this.RequestForm.controls["LOTONumber"].value;

    this.Requestdata.Power_Off_Required =
      this.RequestForm.controls["Poweroff"].value;
    this.Requestdata.Number_Of_Workers =
      this.RequestForm.controls["peopleinvalidcount"].value;
    this.Requestdata.Notes = this.RequestForm.controls["Note"].value;

    this.Requestdata.Badge_Numbers =
      this.RequestForm.controls["BADGENUMBER"].value.toString();
    console.log("Requestdata", this.Requestdata)

    this.Requestdata.rams_file = this.RequestForm.controls["rams_file"].value;

    let formData = new FormData();

    // for (const [key, value] of Object.entries(this.Requestdata)) {
    //   if (key != 'rams_file') {
    //     formData.append(key, value as string); // Ensure values are strings if needed
    //   }
    // }

    // console.log(this.RequestForm.controls["rams_file"].value)
    // console.log(this.Requestdata.rams_file)
    // formData.append("rams_file", this.Requestdata.rams_file)
    for (const [key, value] of Object.entries(this.Requestdata)) {
      if (key !== 'rams_file' && value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    }
    
    // Then: Append each file under same 'rams_file[]' field
    if (this.Requestdata.rams_file && this.Requestdata.rams_file.length > 0) {
      (this.Requestdata.rams_file as File[]).forEach((file: File) => {
        formData.append('rams_file[]', file);  // same field name again and again
      });
    }

    console.log(this.RequestForm.controls["rams_file"].value)
    console.log(this.Requestdata.rams_file)

    this.requestsserivies.CreateNewRequest(formData).subscribe(
      (res) => {
        this.spinner = false;
        this.openSnackBar("Request Created Successfully");
        this.route.navigateByUrl("/user/list-request");
      },
      (error) => {
        this.openSnackBar("Something went wrong. Plz try again later...");
      }
    );
  }

private _lookupsReady = false;

private buildLookups(): void {
  this.safetyListMap = (this.safetyList || []).reduce((acc, x) => {
    acc[String(x.id)] = x.precaution || x.name || '';
    return acc;
  }, {} as Record<string, string>);

  this.subContractorMap = (this.SubContractors || []).reduce((acc, x) => {
    acc[String(x.id)] = x.subContractorName || x.name || '';
    return acc;
  }, {} as Record<string, string>);

  this.typeOfActivityMap = (this.TypeofActivites || []).reduce((acc, x) => {
    acc[String(x.id)] = x.activityName || x.typeOfActivity || x.name || '';
    return acc;
  }, {} as Record<string, string>);

  this.electricalMap = (this.electricalList || []).reduce((acc, x) => {
    acc[String(x.id)] = x.electrical_works || x.name || '';
    return acc;
  }, {} as Record<string, string>);

  this.mechanicalMap = (this.mechanicalList || []).reduce((acc, x) => {
    acc[String(x.id)] = x.mechanical_works || x.name || '';
    return acc;
  }, {} as Record<string, string>);

  this._lookupsReady = true;
}


 controlLabels: Record<string, string> = {
  'Sub_Contractor_Id': 'Contractor',
  'new_sub_contractor': 'Sub Contractor',
  'Foreman': 'Foreman-Supervisor',
  'Foreman_Phone_Number': 'Foreman Phone',
  'Activity': 'Activity',
  'Type_Of_Activity_Id': 'Type of Activity',
  'rams_number': 'RAMS Number',
  'permit_type': 'Permit Type',
  'description_of_activity': 'Description of activity',
  'Working_Date': 'Date',
  'Start_Time': 'Start Time',
  'End_Time': 'End Time',
  'night_shift': 'Is this a night shift?',
  'new_date': 'New Date',
  'new_end_time': 'New End Time',
  'Tools': 'Tools Used',
  'Machinery': 'Machinery Used',
  'work_type': 'Type of Work',
  'electrical_works': 'Electrical Works',
  'mechanical_works': 'Mechanical Works',
  'affecting_other_contractors': 'Can you confirm that your works are not affecting with other contractors working in this area before starting the work?',
  'other_conditions': 'Are there other conditions that must be taken into account during the work?',
  'other_conditions_input': 'Note the Other Condition',
  'lighting_begin_work': 'Can you confirm that there will be enough work lighting to begin the work?',
  'specific_risks': 'Have the team been informed about the spesific risks based on task?(RAMS training etc.)',
  'environment_ensured': 'Is the work environment safety ensured? Have the necessary warning signs been placed?',
  'course_of_action': 'Have the team been informed about the course of action in emergencies?',
  'welding_activitiy': 'Is there be any welding activitiy?',
  'heat_treatment': 'The people who will do heat treatment, had welder certificates?',
  'air_extraction_be_established': 'Should air extraction be established? (Welding fumes and the like must be led directly into the open air)',
  'Hot_work': 'Hot Work',
  'tasks_in_progress_in_the_area': 'Are there other tasks in progress in the area?',
  'lighting_sufficiently': 'Have you considered any alternative methods to the hot work method? (Ex.: replacing the angle grinder with hydraulic cutters or using prefab electronic orders for measurement)',
  'spesific_risks_based_on_task': 'Have the team been informed about the spesific risks based on task?(RAMS training etc.)',
  'work_environment_safety_ensured': 'Is the work environment safety ensured? Have the necessary warning signs been placed?',
  'course_of_action_in_emergencies': 'Have the team been informed about the course of action in emergencies?',
  'fire_watch_establish': 'Should a fire watch be established?',
  'combustible_material': 'Can you confirm that the flammable material are removed from the work area?',
  'safety_measures': 'Should safety measures implemented to stop sparks from splattering on a flooring or other surfaces?',
  'extinguishers_and_fire_blanket': 'Are fire extinguishers and fire blanket ready for use in the area ?',
  'working_on_electrical_system': 'Working on Electrical Systems',
  'responsible_for_the_informed': 'Is the responsible for the area informed?',
  'de_energized': 'Check if the board is de-energized - is it de-energized?',
  'if_no_loto': 'Secure the area against reconnection using LOTO (Lock-out/Tag-out) with at least a craftsmans padlock.',
  'do_risk_assessment': 'Do you have risk assessment done?',
  'if_yes_loto': 'Secure the area against reconnection using LOTO (Lock-out/Tag-out) with at least a craftsmans padlock.',
  'electricity_have_isulation': 'Do appliances/devices that run on electricity have isulation?',
  'working_hazardious_substen': 'Working with Hazardous Substances/Chemicals',
  'relevant_mal': 'Relevant MAL-codes and safety datasheets for hazardous medias have been presented?',
  'msds': 'Is MSDS (Material Safety Data Sheet) submitted?',
  'equipment_taken_account': 'Has the use of protective equipment been taken into account - and are they present?',
  'ventilation': 'Has the use of ventilation been taken into acount?',
  'hazardaus_substances': 'Will the hazardaus substances affect people outside the working area? (fumes)',
  'storage_and_disposal': 'Are there means for safe storage and disposal? Is it mapped on the site plan (in case of large amount or long term storage)',
  'reachable_case': 'Does the spill kits are in place and reachable in case there is a leaking?',
  'checical_risk_assessment': 'Is RAMS (Risk assessment and Method statement) covering chemichal risk assessment for working with the substance?',
  'pressure_tesing_of_equipment': 'Pressure testing of equipment',
  'line_walk': 'Linewalk of the pipework/equipment done?',
  'pressure_test_coordinated': 'Pressure test is coordinated with NNE C&Q?',
  'pipework_mic': 'Is the pipework/equipment MIC? (Mechanical Installation Complete)?',
  'loto_plan_attached': 'LOTO plan attached to the work permit?',
  'exclusion_zone_calculated': 'Is the exclusion zone calculated and layout attached to work permit?',
  'pneumatic_hydrostatic': 'Pneumatic Test?',
  'pressure_pneumatic': 'Pressure of Pnematic Test (in BarG)',
  'pressure_of_the_test': 'Hydrostatic test?',
  'pressure_hydrostatic': 'Pressure of Hydrostatic Test (in BarG)',
  'safety_valves_calibrated': 'Safety Valves are calibrated and attached to the Pressure testing rig?',
  'working_at_height': 'Working at Height',
  'segragated_demarkated': 'Has the working area been segregated or demarkated?',
  'lanyard_attachments': 'Are suitable anchor points are in place for lanyard attachments?',
  'rescue_plan': 'In case of emergency is there a rescue plan in place?',
  'avoid_hazards': 'Have the work been planned and coordinated to avoid hazards like (falling objects/materials onto the other workers, interference between the machines etc.)',
  'height_training': 'Have the team had certified working at height training?',
  'supervision': 'Will this work be carried out by, and under the supervision of personnel who have recieved Working at Height training?',
  'shock_absorbing': 'Full body harness with shock absorbing & twin lanyard provided?',
  'height_equipments': 'Are the working at height equipments (Safety harness and lanyard) has inspected and suitable to carry out the task?',
  'vertical_life': 'Horizonal or vertical life line systems in place?',
  'secured_falling': 'Are all tools are secured from falling from height?',
  'dropped_objects': 'Have protective meassures for dropped objects been established? (lanyards, demarkated working area, nets)?',
  'safe_acces': 'Have proper and safe accces and egress been provided?',
  'weather_acceptable': 'Are the weather conditions acceptable?',
  'working_confined_spaces': 'Working in Confined Spaces',
  'vapours_gases': 'Is the tank/container cleaned so that the works can take place without risk from vapours, gases etc.?',
  'lel_measurement': 'Are oxygen measurement and LEL measurement done before starting the work?',
  'all_equipment': 'Are the container and all equipment on the container, including agitator properly secured?',
  'exit_conditions': 'Are there safe entry and exit conditions? (e.g. ladder)',
  'communication_emergency': 'Are means of communication for emergency rescue determined?(Siren, radio or telephone options for emergency rescue?)',
  'rescue_equipments': 'Are rescue equipments are in place and ready?',
  'space_ventilation': 'Is space and ventilation adequate?',
  'oxygen_meter': 'Is an oxygen meter provided for the work?',
  'excavation_works': 'Excavation Works',
  'excavation_segregated': 'Is the excavation are segregated (1 meter from edge with hard barriers or 2 meters with soft barriers) before the work begins?',
  'nn_standards': 'Has the digging permit been obtained in accordance with Danish regulations and NN standards?',
  'excavation_shoring': 'Does excavation requires shoring?',
  'danish_regulation': 'Is the sloping correct in relation to the depth of the dig as per Danish regulations?',
  'safe_access_and_egress': 'Have proper and safe access and egress been provided?',
  'correctly_sloped': 'Are correctly positioned ladders or correctly sloped stairways accessible?',
  'inspection_dates': 'Does all machines have valid inspection dates?',
  'marked_drawings': 'Have clearly marked drawings been submitted?',
  'underground_areas_cleared': 'Are the underground areas cleared from all electrical, piping and other services?',
  'using_cranes_or_lifting': 'Using Crane or Lifting',
  'appointed_person': 'Is there an appointed person in charge of the lifting/crane operation?',
  'vendor_supplier': 'Are the details of load (dimensions, SWL) and the loading/unloading requirements provided from vendor or supplier?',
  'lift_plan': 'Is lift plan submitted?',
  'supplied_and_inspected': 'Has the correct crane/lifting equipment as stated in the lift plan been supplied and inspected?',
  'legal_required_certificates': 'Do the crane operators have the legal required certificates?',
  'prapared_lifting': 'Is laydown area suitable and prepared for lifting?',
  'lifting_task_fenced': 'Is the entire area of the lifting task fenced off?',
  'overhead_risks': 'Have all overhead risks (cables, adjacent structures etc) been identifed and suitable precautions implemented?',
  'power_on': 'Energization of Electrical equipment',
  'responsible_for_the_area': 'Is the responsible for the area informed?',
  'risk_assessment_done': 'Do you have a risk assessment done?',
  'barriers_signage': 'Barriers & Signage in place?',
  'energized_been_tested': 'Have all the cables that need to be energized been tested?',
  'punches_been_closed': 'Have all punches been closed?',
  'toct_checklist': 'Is Electrical Checklist completed?',
  'informed_aligned': 'Have you Informed and Aligned with EL LOTO Team?',
  'pressurization': 'Energization of Mechanical equipment',
  'performed_approved': 'Pressure test performed and approved?',
  'flushing_approved': 'Flushing approved?',
  'mc_approved': 'MC approved?',
  'mc_number_text': 'MC Number',
  'visual_inspection': 'Walkdown with Visual inspection performed?',
  'loto_plan_approved': 'LOTO plan approved and installed by LOTO officer?',
  'follow_media_code': 'Ensure Safety Valves follow Media Code?',
  'cq_safety_signs': 'C&Q Safety signs are in place?',
  'Safety_Precautions': 'Safety Precaustions',
  'eye_protection': 'Eye Protection',
  'fall_protection': 'Fall Protection',
  'hearing_protection': 'Hearing protection',
  'respiratory_protection': 'Respiratory protection',
  'other_ppe': 'Other PPE',
  'peopleinvalidcount': 'Number of workers involved',
  'Notes': 'Note'
};

private findInList(list: any[], id: any, nameProps: string[]): string | undefined {
  if (!Array.isArray(list)) return undefined;
  const found = list.find(x => String(x?.id) === String(id));
  if (!found) return undefined;
  for (const p of nameProps) if (found[p]) return found[p];
  return undefined;
}

private mapFieldValue(field: string, value: any): string {
  if (value == null || value === '' || value === '0') return '';

  const toKey = (v: any) => String(v);

  const mapSingle = (fld: string, v: any): string => {
    const key = toKey(v);

    switch (fld) {
      case 'Safety_Precautions':
        return this.safetyListMap?.[key]
          ?? this.findInList(this.safetyListMap, key, ['precaution','name'])
          ?? key;

      case 'Sub_Contractor_Id':
        return this.subContractorMap?.[key]
          ?? this.findInList(this.SubContractors, key, ['subContractorName','name'])
          ?? key;

      case 'Type_Of_Activity_Id':
        return this.typeOfActivityMap?.[key]
          ?? this.findInList(this.TypeofActivites, key, ['activityName','typeOfActivity','name'])
          ?? key;

      case 'electrical_works':
        return this.electricalMap?.[key]
          ?? this.findInList(this.electricalList, key, ['electrical_works','name'])
          ?? key;

      case 'mechanical_works':
        return this.mechanicalMap?.[key]
          ?? this.findInList(this.mechanicalList, key, ['mechanical_works','name'])
          ?? key;

      default:
        return key;
    }
  };

  return Array.isArray(value)
    ? value.map(v => mapSingle(field, v)).filter(Boolean).join(', ')
    : mapSingle(field, value);
}

private logFieldChanges(previousData: any, currentData: any): any[] {
  const changedFields: any[] = [];

  // ensure lookups exist
  if (!this._lookupsReady) this.buildLookups();

  const trackedFields = Object.keys(this.updaterequestdata).filter(
    key => !['id','userId','createdTime','denmark_time','rams_file','Request_status1'].includes(key)
  );

  const yesNoNA: Record<string, string> = { '0':'No', '1':'Yes', '2':'NA' };
  const idFields = new Set(['Safety_Precautions','Sub_Contractor_Id','Type_Of_Activity_Id','electrical_works','mechanical_works']);

  trackedFields.forEach(field => {
    let prev = previousData[field];
    let curr = currentData[field];

    // Trim time seconds
    if (field === 'Start_Time' || field === 'End_Time') {
      prev = prev?.toString().slice(0,5);
      curr = curr?.toString().slice(0,5);
    }

    const mapNonId = (v: any) => {
      const s = v == null ? '' : String(v).trim();
      // Only translate 0/1/2 on non-ID fields
      return yesNoNA.hasOwnProperty(s) ? yesNoNA[s] : s;
    };

    const mappedPrev = idFields.has(field) ? this.mapFieldValue(field, prev) : mapNonId(prev);
    const mappedCurr = idFields.has(field) ? this.mapFieldValue(field, curr) : mapNonId(curr);

    if (mappedPrev !== mappedCurr) {
      changedFields.push({
        field_name: this.controlLabels[field] || field,
        previous: mappedPrev,
        present: mappedCurr
      });
    }
  });

  // Remove items where present is empty but previous had value
  for (let i = changedFields.length - 1; i >= 0; i--) {
    if (changedFields[i].previous && !changedFields[i].present) {
      changedFields.splice(i, 1);
    }
  }

  return changedFields;
}

  UpdateRequest() {
          const requiredFields = ['segragated_demarkated', 'system_drained', 'excavation_shoring'];
  requiredFields.forEach(field => {
    if (!this.RequestForm.get(field).value) {
      this.RequestForm.get(field).setValue(0);
    }
  });
    (Object as any).keys(this.RequestForm.controls).forEach((control) => {
      this.RequestForm.get(`${control}`).updateValueAndValidity();
      this.RequestForm.get(`${control}`).markAsTouched();
    });
    console.log("updatefunction Activted...")
     if (!this.RequestForm.valid) {
    console.error("Form is invalid. Please check the following errors:");
    Object.keys(this.RequestForm.controls).forEach(controlName => {
      const control = this.RequestForm.get(controlName);
      if (control.invalid) {
        console.error(`Field ${controlName} is invalid:`, control.errors);
      }
    });
    return;
  }
    // console.log(this.NewRequestData, 'editttt')
    // console.log("res checking")
    if (this.RequestForm.valid) {
      const originalData = { ...this.NewRequestData };
      var badarray = [];
      this.spinner = true;

      this.safetyprecdata.forEach((x) => {
        badarray.push(x["id"]);
      });

      var today = moment.tz("Europe/Copenhagen");
      this.CurrenttimeNow = today.format('HH:mm:ss');
      console.log("Time now", this.CurrenttimeNow)

      const [currentDenmarkDate, currentDenmarkTime] = [
        ...config.Denmarktz.split(" "),
      ];

      console.log(currentDenmarkDate)
      console.log(currentDenmarkTime)

      this.updaterequestdata.denmark_time = config.getDenmarkTime.full();
      // this.updaterequestdata.denmark_date = currentDenmarkDate;

      this.updaterequestdata.createdTime = config.getDenmarkTime.full();
      console.log(this.updaterequestdata.createdTime, "time")

      this.updaterequestdata.Assign_Start_Time =
        this.RequestForm.controls["AssignStartTime"].value;
      this.updaterequestdata.Assign_End_Time =
        this.RequestForm.controls["AssignEndTime"].value;
      this.updaterequestdata.Special_Instructions =
        this.RequestForm.controls["SpecialInstruction"].value;
      // this.updaterequestdata.Safety_Precautions = this.safetyprecdata.map(obj => obj.id).join(",");//this.RequestForm.controls["Safetyprecaustion"].value;
      // this.updaterequestdata.Safety_Precautions =  badarray.toString();
      if (this.NewRequestData.Request_status == "Draft") {
        this.updaterequestdata.Request_status = "Hold";
        this.updaterequestdata.Request_status1 = "";
      } else {
        this.updaterequestdata.Request_status =
          this.RequestForm.controls["Status"].value;
          this.updaterequestdata.Request_status1 = 1;
      }

      var badarray = [];
      var roomoarr = [];
      this.Badges.forEach((x) => {
        badarray.push(x["badgeId"]);
      });
      this.Rooms.forEach((x) => {
        roomoarr.push(x["room_id"]);
      });
      this.updaterequestdata.Room_Nos =
        this.RequestForm.controls["Room"].value.toString();
       this.updaterequestdata.permit_type =
        this.RequestForm.controls["permit_type"].value;

      this.updaterequestdata.Activity =
        this.RequestForm.controls["Activity"].value;
      // this.updaterequestdata.Badge_Numbers = this.RequestForm.controls["BADGENUMBER"].value;
      this.updaterequestdata.Badge_Numbers =
        this.RequestForm.controls["BADGENUMBER"].value.toString();
      // this.updaterequestdata.Site_Id = this.RequestForm.controls["Site"].value;
      // this.updaterequestdata.Building_Id =
      //   this.RequestForm.controls["Building"].value;
      this.updaterequestdata.Room_Type =
        this.RequestForm.controls["FloorName"].value;
      // this.updaterequestdata.Request_Date = this.RequestForm.controls["Requestdate"].value;
      this.updaterequestdata.Company_Name =
        this.RequestForm.controls["Companyname"].value;
      this.updaterequestdata.Sub_Contractor_Id =
        this.RequestForm.controls["SubContractor"].value;
      this.updaterequestdata.teamId = this.RequestForm.controls["Team"].value;
      this.updaterequestdata.Foreman = this.RequestForm.controls["Foreman"].value;
      this.updaterequestdata.Foreman_Phone_Number =
        this.RequestForm.controls["ForemanPhone"].value;
      // this.Requestdata.Type_Of_Activity_Id=this.RequestForm.controls["TypeActivity"].value;
      this.updaterequestdata.Type_Of_Activity_Id =
        this.RequestForm.controls["TypeActivity"].value;
      // let workdate = this.datePipe.transform(
      //   this.RequestForm.controls["Startdate"].value,
      //   "yyyy-MM-dd"
      // );
      let startDateValue = this.RequestForm.controls["Startdate"].value;
      
      let newDateValue = this.RequestForm.controls["newWorkDate"].value;
      // Check if the start date exists and is valid
      let workdate = startDateValue != '0000-00-00' ? this.datePipe.transform(startDateValue, "yyyy-MM-dd")
        : null;
      //   let newworkdate = (newDateValue != '0000-00-00') || (newDateValue != "") || (newDateValue != "null") ? this.datePipe.transform(newDateValue, "yyyy-MM-dd")
        // : null;
        let newworkdate = (newDateValue && newDateValue !== '0000-00-00' && newDateValue !== '' && newDateValue !== 'null' && newDateValue !== null)
  ? this.datePipe.transform(newDateValue, "yyyy-MM-dd")
  : null;
        this.updaterequestdata.night_shift =
        this.RequestForm.controls["night_shift"].value;
        // this.updaterequestdata.new_date = newworkdate;
        // if(this.isValidDateFormat(this.RequestForm.controls["newWorkDate"].value)) {    
        // let newDateValue = this.RequestForm.controls["newWorkDate"].value;
        //   let newworkdate = newDateValue != '0000-00-00' ? this.datePipe.transform(newDateValue, "yyyy-MM-dd")
        // : null;
        //   this.updaterequestdata.new_date = newworkdate;
        // } else {
        //   this.updaterequestdata.new_date = "";
        // }
          if(this.updaterequestdata.night_shift == 1) {
          this.updaterequestdata.new_date = newworkdate;
        this.updaterequestdata.new_end_time =
        this.RequestForm.controls["new_end_time"].value;
          } else {
            this.updaterequestdata.new_date = null;
            this.updaterequestdata.new_end_time = ""
          }

          console.log(".....newdateedit", this.updaterequestdata.new_date);
       
      this.updaterequestdata.Working_Date = workdate;
      this.updaterequestdata.Start_Time =
        this.RequestForm.controls["StartTime"].value;
      this.updaterequestdata.End_Time =
        this.RequestForm.controls["EndTime"].value;
      //this.Requestdata.Site_Id = this.RequestForm.controls["Site"].value;
      // this.Requestdata.Building_Id = this.RequestForm.controls["Building"].value;
      // this.Requestdata.Floor_Id = this.RequestForm.controls["FloorName"].value;
      // this.updaterequestdata.Room_Nos = roomoarr.toString();
      // this.updaterequestdata.Room_Type =
      //   this.RequestForm.controls["RoomType"].value;
      // this.updaterequestdata.Crane_Requested =
      //   this.RequestForm.controls["CMTdata"].value;
      this.updaterequestdata.Crane_Number =
        this.RequestForm.controls["CmtValue"].value;
      this.updaterequestdata.Tools = this.RequestForm.controls["Tools"].value;
      this.updaterequestdata.Machinery =
        this.RequestForm.controls["Machinery"].value;
      this.updaterequestdata.Hot_work =
        this.RequestForm.controls["HOTWORK"].value;
      this.updaterequestdata.Certified_Person =
        this.RequestForm.controls["CertifiedPerson"].value;
      this.updaterequestdata.LOTO_Procedure =
        this.RequestForm.controls["LOTOPROCEDURE"].value;
      this.updaterequestdata.LOTO_Number =
        this.RequestForm.controls["LOTONumber"].value;
      this.updaterequestdata.rams_number = this.RequestForm.controls["RAMSNumber"].value;


      this.updaterequestdata.work_type = this.RequestForm.controls["work_type"].value;
      this.updaterequestdata.electrical_works =
        this.RequestForm.controls["electrical_works"].value.toString();
    this.updaterequestdata.mechanical_works =
        this.RequestForm.controls["mechanical_works"].value.toString();

     this.updaterequestdata.pressure_pneumatic = this.RequestForm.controls["pressure_pneumatic"].value;
      this.updaterequestdata.pressure_hydrostatic = this.RequestForm.controls["pressure_hydrostatic"].value;
       this.updaterequestdata.mc_number_text = this.RequestForm.controls["mc_number_text"].value;

      // new fields add

      this.updaterequestdata.name_of_the_fire_watcher = this.RequestForm.controls["fireWatcher"].value;
      this.updaterequestdata.phone_number_of_fire_watcher = this.RequestForm.controls["fireWatcherNumber"].value;

      this.updaterequestdata.tasks_in_progress_in_the_area = this.RequestForm.controls["floatLabel1"].value;
      // this.updaterequestdata.account_during_the_work = this.RequestForm.controls["floatLabel2"].value;
      this.updaterequestdata.lighting_sufficiently = this.RequestForm.controls["floatLabel3"].value;
      this.updaterequestdata.spesific_risks_based_on_task = this.RequestForm.controls["floatLabel4"].value;
      this.updaterequestdata.work_environment_safety_ensured = this.RequestForm.controls["floatLabel5"].value;
      this.updaterequestdata.course_of_action_in_emergencies = this.RequestForm.controls["floatLabel6"].value;

      this.updaterequestdata.fire_watch_establish = this.RequestForm.controls["floatLabel7"].value;
      this.updaterequestdata.combustible_material = this.RequestForm.controls["floatLabel8"].value;
      this.updaterequestdata.safety_measures = this.RequestForm.controls["floatLabel9"].value;
      this.updaterequestdata.extinguishers_and_fire_blanket = this.RequestForm.controls["floatLabel10"].value;

      this.updaterequestdata.welding_activitiy = this.RequestForm.controls["NEWHOTWORK"].value;
      this.updaterequestdata.heat_treatment = this.RequestForm.controls["NEWHOTWORK1"].value;
      this.updaterequestdata.air_extraction_be_established = this.RequestForm.controls["NEWHOTWORK2"].value;

      // new fields added
      this.updaterequestdata.new_sub_contractor = this.RequestForm.controls["newSubContractor"].value;

      this.updaterequestdata.affecting_other_contractors = this.RequestForm.controls["floatLabel11"].value;
      this.updaterequestdata.other_conditions = this.RequestForm.controls["floatLabel12"].value;
      this.updaterequestdata.lighting_begin_work = this.RequestForm.controls["floatLabel13"].value;
      this.updaterequestdata.specific_risks = this.RequestForm.controls["floatLabel14"].value;
      this.updaterequestdata.environment_ensured = this.RequestForm.controls["floatLabel15"].value;
      this.updaterequestdata.course_of_action = this.RequestForm.controls["floatLabel16"].value;

      // electrical system
      this.updaterequestdata.working_on_electrical_system = this.RequestForm.controls["electricalSystem"].value;
      this.updaterequestdata.responsible_for_the_informed = this.RequestForm.controls["floatLabel17"].value;
      this.updaterequestdata.de_energized = this.RequestForm.controls["floatLabel18"].value;
      this.updaterequestdata.if_no_loto = this.RequestForm.controls["floatLabel19"].value;
      this.updaterequestdata.do_risk_assessment = this.RequestForm.controls["floatLabel20"].value;
      this.updaterequestdata.if_yes_loto = this.RequestForm.controls["floatLabel21"].value;
      this.updaterequestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value;
      this.updaterequestdata.electrician_certification = this.RequestForm.controls["floatLabel23"].value;

       // commission fields of electrical systems
    this.updaterequestdata.line_walk = this.RequestForm.controls["floatLabel102"].value;
    this.updaterequestdata.pressure_test_coordinated = this.RequestForm.controls["floatLabel103"].value;
    this.updaterequestdata.pipework_mic = this.RequestForm.controls["floatLabel104"].value;
    this.updaterequestdata.loto_plan_attached = this.RequestForm.controls["floatLabel105"].value;
    this.updaterequestdata.exclusion_zone_calculated = this.RequestForm.controls["floatLabel106"].value;
    this.updaterequestdata.pneumatic_hydrostatic = this.RequestForm.controls["floatLabel107"].value;
    this.updaterequestdata.pressure_of_the_test = this.RequestForm.controls["floatLabel108"].value;
    this.updaterequestdata.safety_valves_calibrated = this.RequestForm.controls["floatLabel109"].value;

      // working_hazardious

      this.updaterequestdata.working_hazardious_substen = this.RequestForm.controls["HAZARDOUS"].value;
      this.updaterequestdata.relevant_mal = this.RequestForm.controls["floatLabel24"].value;
      this.updaterequestdata.msds = this.RequestForm.controls["floatLabel25"].value;
      this.updaterequestdata.equipment_taken_account = this.RequestForm.controls["floatLabel26"].value;
      this.updaterequestdata.ventilation = this.RequestForm.controls["floatLabel27"].value;
      this.updaterequestdata.hazardaus_substances = this.RequestForm.controls["floatLabel28"].value;
      this.updaterequestdata.storage_and_disposal = this.RequestForm.controls["floatLabel29"].value;
      this.updaterequestdata.reachable_case = this.RequestForm.controls["floatLabel30"].value;
      this.updaterequestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value;

      //  <!-- testing start -->

      this.updaterequestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value;
      this.updaterequestdata.transfer_of_palnt = this.RequestForm.controls["floatLabel32"].value;
      this.updaterequestdata.area_drained = this.RequestForm.controls["floatLabel33"].value;
      this.updaterequestdata.area_depressurised = this.RequestForm.controls["floatLabel34"].value;
      this.updaterequestdata.area_flused = this.RequestForm.controls["floatLabel35"].value;
      this.updaterequestdata.tank_area_container = this.RequestForm.controls["floatLabel36"].value;
      this.updaterequestdata.system_free_for_dust = this.RequestForm.controls["floatLabel37"].value;
      this.updaterequestdata.loto_plan_submitted = this.RequestForm.controls["floatLabel38"].value;

      // <!-- height start -->

      this.updaterequestdata.working_at_height = this.RequestForm.controls["WORKHEIGHT"].value;
      this.updaterequestdata.segragated_demarkated = this.RequestForm.controls["segragated_demarkated"].value;
      this.updaterequestdata.lanyard_attachments = this.RequestForm.controls["floatLabel39"].value;
      this.updaterequestdata.rescue_plan = this.RequestForm.controls["floatLabel40"].value;
      this.updaterequestdata.avoid_hazards = this.RequestForm.controls["floatLabel41"].value;
      this.updaterequestdata.height_training = this.RequestForm.controls["floatLabel42"].value;
      this.updaterequestdata.supervision = this.RequestForm.controls["floatLabel43"].value;
      this.updaterequestdata.shock_absorbing = this.RequestForm.controls["floatLabel44"].value;
      this.updaterequestdata.height_equipments = this.RequestForm.controls["floatLabel45"].value;
      this.updaterequestdata.vertical_life = this.RequestForm.controls["floatLabel46"].value;
      this.updaterequestdata.secured_falling = this.RequestForm.controls["floatLabel47"].value;
      this.updaterequestdata.dropped_objects = this.RequestForm.controls["floatLabel48"].value;
      this.updaterequestdata.safe_acces = this.RequestForm.controls["floatLabel49"].value;
      this.updaterequestdata.weather_acceptable = this.RequestForm.controls["floatLabel50"].value;

      // working_confined_spaces

      this.updaterequestdata.working_confined_spaces = this.RequestForm.controls["CONFINEDSPACE"].value;
      this.updaterequestdata.vapours_gases = this.RequestForm.controls["floatLabel51"].value;
      this.updaterequestdata.lel_measurement = this.RequestForm.controls["floatLabel52"].value;
      this.updaterequestdata.all_equipment = this.RequestForm.controls["floatLabel53"].value;
      this.updaterequestdata.exit_conditions = this.RequestForm.controls["floatLabel54"].value;
      this.updaterequestdata.communication_emergency = this.RequestForm.controls["floatLabel55"].value;
      this.updaterequestdata.rescue_equipments = this.RequestForm.controls["floatLabel56"].value;
      this.updaterequestdata.space_ventilation = this.RequestForm.controls["floatLabel57"].value;
      this.updaterequestdata.oxygen_meter = this.RequestForm.controls["floatLabel58"].value;

      // work_in_atex_area

      this.updaterequestdata.work_in_atex_area = this.RequestForm.controls["ATEXAREA"].value;
      this.updaterequestdata.ex_area_downgraded = this.RequestForm.controls["floatLabel59"].value;
      this.updaterequestdata.atmospheric_tester = this.RequestForm.controls["floatLabel60"].value;
      this.updaterequestdata.flammable_materials = this.RequestForm.controls["floatLabel61"].value;
      this.updaterequestdata.potential_explosive = this.RequestForm.controls["floatLabel62"].value;
      this.updaterequestdata.oxygen_meter_confined_spaces = this.RequestForm.controls["floatLabel63"].value;

      // <!-- FACILITIES LOTO start -->

      this.updaterequestdata.securing_facilities = this.RequestForm.controls["FACILITIESLOTO"].value;
      this.updaterequestdata.loto_facilities = this.RequestForm.controls["floatLabel64"].value;
      this.updaterequestdata.system_depressurised = this.RequestForm.controls["floatLabel65"].value;
      this.updaterequestdata.system_drained = this.RequestForm.controls["system_drained"].value;
      this.updaterequestdata.passive_pause_other = this.RequestForm.controls["floatLabel67"].value;
      this.updaterequestdata.electricity_have_insulation = this.RequestForm.controls["floatLabel68"].value;
      this.updaterequestdata.covered_or_secured = this.RequestForm.controls["floatLabel69"].value;
      this.updaterequestdata.people_electrician_certification = this.RequestForm.controls["floatLabel70"].value;

      // excavation_works

      this.updaterequestdata.excavation_works = this.RequestForm.controls["ExcavationWorks"].value;
      this.updaterequestdata.excavation_segregated = this.RequestForm.controls["floatLabel71"].value;
      this.updaterequestdata.nn_standards = this.RequestForm.controls["floatLabel72"].value;
      this.updaterequestdata.excavation_shoring = this.RequestForm.controls["excavation_shoring"].value;
      this.updaterequestdata.danish_regulation = this.RequestForm.controls["floatLabel74"].value;
      this.updaterequestdata.safe_access_and_egress = this.RequestForm.controls["floatLabel75"].value;
      this.updaterequestdata.correctly_sloped = this.RequestForm.controls["floatLabel76"].value;
      this.updaterequestdata.inspection_dates = this.RequestForm.controls["floatLabel77"].value;
      this.updaterequestdata.marked_drawings = this.RequestForm.controls["floatLabel78"].value;
      this.updaterequestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value;

      // using_cranes_or_lifting

      this.updaterequestdata.using_cranes_or_lifting = this.RequestForm.controls["CraneLifting"].value;
      this.updaterequestdata.appointed_person = this.RequestForm.controls["floatLabel80"].value;
      this.updaterequestdata.vendor_supplier = this.RequestForm.controls["floatLabel81"].value;
      this.updaterequestdata.lift_plan = this.RequestForm.controls["floatLabel82"].value;
      this.updaterequestdata.supplied_and_inspected = this.RequestForm.controls["floatLabel83"].value;
      this.updaterequestdata.legal_required_certificates = this.RequestForm.controls["floatLabel84"].value;
      this.updaterequestdata.prapared_lifting = this.RequestForm.controls["floatLabel85"].value;
      this.updaterequestdata.lifting_task_fenced = this.RequestForm.controls["floatLabel86"].value;
      this.updaterequestdata.overhead_risks = this.RequestForm.controls["floatLabel87"].value;

       // pressurization power on fields
    this.updaterequestdata.power_on = this.RequestForm.controls["Poweron"].value;
    this.updaterequestdata.responsible_for_the_area = this.RequestForm.controls["floatLabel88"].value;
    this.updaterequestdata.risk_assessment_done = this.RequestForm.controls["floatLabel89"].value;
    this.updaterequestdata.barriers_signage = this.RequestForm.controls["floatLabel90"].value;
    this.updaterequestdata.energized_been_tested = this.RequestForm.controls["floatLabel91"].value;
    this.updaterequestdata.punches_been_closed = this.RequestForm.controls["floatLabel92"].value;
    this.updaterequestdata.toct_checklist = this.RequestForm.controls["floatLabel93"].value;
    this.updaterequestdata.informed_aligned = this.RequestForm.controls["floatLabel94"].value;

        // pressurization fields
    this.updaterequestdata.pressurization = this.RequestForm.controls["Pressurization"].value;
    this.updaterequestdata.performed_approved = this.RequestForm.controls["floatLabel95"].value;
    this.updaterequestdata.flushing_approved = this.RequestForm.controls["floatLabel96"].value;
    this.updaterequestdata.mc_approved = this.RequestForm.controls["floatLabel97"].value;
    this.updaterequestdata.visual_inspection = this.RequestForm.controls["floatLabel98"].value;
    this.updaterequestdata.loto_plan_approved = this.RequestForm.controls["floatLabel99"].value;
    this.updaterequestdata.follow_media_code = this.RequestForm.controls["floatLabel100"].value;
    this.updaterequestdata.cq_safety_signs = this.RequestForm.controls["floatLabel101"].value;

      this.updaterequestdata.visible_clothing = this.RequestForm.controls["VisableClothing"].value;
      this.updaterequestdata.safety_shoes = this.RequestForm.controls["SafetyShoes"].value;
      this.updaterequestdata.helmet = this.RequestForm.controls["Helmet"].value;

      this.updaterequestdata.description_of_activity = this.RequestForm.controls["descriptActivity"].value;
      this.updaterequestdata.specific_gloves = this.RequestForm.controls["specific_gloves"].value;
      this.updaterequestdata.eye_protection = this.RequestForm.controls["eye_protection"].value;
      this.updaterequestdata.fall_protection = this.RequestForm.controls["fall_protection"].value;
      this.updaterequestdata.hearing_protection = this.RequestForm.controls["hearing_protection"].value;
      this.updaterequestdata.respiratory_protection = this.RequestForm.controls["respiratory_protection"].value;
      this.updaterequestdata.other_ppe = this.RequestForm.controls["other_ppe"].value;
      this.updaterequestdata.other_conditions_input = this.RequestForm.controls["other_conditions_input"].value;

      this.updaterequestdata.Power_Off_Required =
        this.RequestForm.controls["Poweroff"].value;
      this.updaterequestdata.Number_Of_Workers =
        this.RequestForm.controls["peopleinvalidcount"].value;
      // this.updaterequestdata.Notes = this.RequestForm.controls["Note"].value;
      this.updaterequestdata.Safety_Precautions =
        this.RequestForm.controls["Safetyprecaustion"].value.toString();

      // status Fields
      this.updaterequestdata.CoMM_initials = this.RequestForm.controls["CoMM_initials"].value;
      this.updaterequestdata.ConM_initials = this.RequestForm.controls["ConM_initials"].value;
      this.updaterequestdata.ConM_initials1 = this.RequestForm.controls["ConM_initials1"].value;
      this.updaterequestdata.reject_reason = this.RequestForm.controls["reject_reason"].value;
      this.updaterequestdata.cancel_reason = this.RequestForm.controls["cancel_reason"].value;

      //hotwork fields while opening
      this.updaterequestdata.low_risk_hotwork = this.RequestForm.controls["low_risk_hotwork"].value;
      this.updaterequestdata.high_risk_hotwork = this.RequestForm.controls["high_risk_hotwork"].value;
      this.updaterequestdata.hot_work_checklist_filled = this.RequestForm.controls["hot_work_checklist_filled"].value;
      this.updaterequestdata.fire_guard_present = this.RequestForm.controls["fire_guard_present"].value;

      // this.updaterequestdata.rams_file = this.RequestForm.controls["rams_file"].value;
      this.addNotes.permit_no = this.updaterequestdata.PermitNo;
      this.addNotes.request_id = this.updaterequestdata.id;
      this.addNotes.user_id = this.updaterequestdata.userId;
      this.addNotes.username = this.userdata["displayName"];
      this.addNotes.note = this.RequestForm.controls["Note"].value;
      this.addNotes.createdTime = config.getDenmarkTime.full();

      // Log field changes
      const changes = this.logFieldChanges(originalData, this.updaterequestdata);
      console.log('Field changes detected:', changes);
      // if(changes.length > 0 && !this.addNotes.note) {
      //   this.openSnackBar("No changes made");
      //   return;
      // }
      this.updaterequestdata.fields = JSON.stringify(changes);

      if(this.isstatusdraft) {
        this.updaterequestdata.fields = "";
      }

      let formData = new FormData();
      console.log("...string", changes.toString());
      for (const [key, value] of Object.entries(this.updaterequestdata)) {
        formData.append(key, value as string); // Ensure values are strings if needed
      }

      // formData.append("rams_file", JSON.stringify(this.updaterequestdata.rams_file))


      this.requestsserivies.UpdateRequest(formData as unknown as EditRequestDto).subscribe(
        (res) => {
          if(this.addNotes.note) {
          this.requestsserivies.AddListReqstNote(this.addNotes).subscribe((res) => {
            this.spinner = false;
            this.openSnackBar("Request Updated Successfully");
            this.requestsserivies.SelectedRequestData = {};
            this.route.navigateByUrl("/user/list-request");
          })
          // this.spinner = false;
          // this.openSnackBar("Request Updated Successfully");
          // this.requestsserivies.SelectedRequestData = {};
          // this.route.navigateByUrl("/user/list-request");
        } else {
            this.spinner = false;
            this.openSnackBar("Request Updated Successfully");
            this.requestsserivies.SelectedRequestData = {};
            this.route.navigateByUrl("/user/list-request");
        }
        },
        (error) => {
          this.openSnackBar("Something went wrong. Plz try again later...");
        }
      );
      
    } else {
      console.error("Form is invalid. Please check the validation errors.");
      this.openSnackBar("Invalid form please check once.");
  Object.keys(this.RequestForm.controls).forEach((key) => {
    const control = this.RequestForm.get(key);
    if (control && control.invalid) {
      console.error(`Field '${key}' has errors:`, control.errors);
    }
  });
    }
  }

  isValidDateFormat(date: string | null | undefined): boolean {
    if (!date) return false; // Handle null, undefined, and empty string
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && date !== '0000-00-00';
  }

  // UpdateRequestDraftToHold(data) {
  //   console.log("draft", data)
  //   var badarray = [];
  //   this.spinner = true;

  //   this.safetyprecdata.forEach((x) => {
  //     badarray.push(x["id"]);
  //   });

  //   const [currentDenmarkDate, currentDenmarkTime] = [
  //     ...config.Denmarktz.split(" "),
  //   ];

  //   console.log(currentDenmarkDate)
  //   console.log(currentDenmarkTime)

  //   // this.updaterequestdata.denmark_time = [currentDenmarkDate, currentDenmarkTime];

  //   this.updaterequestdata.createdTime = [currentDenmarkDate, currentDenmarkTime];
  //   console.log(this.updaterequestdata.createdTime, "time")

  //   this.updaterequestdata.Assign_Start_Time =
  //     this.RequestForm.controls["AssignStartTime"].value;
  //   this.updaterequestdata.Assign_End_Time =
  //     this.RequestForm.controls["AssignEndTime"].value;
  //   this.updaterequestdata.Special_Instructions =
  //     this.RequestForm.controls["SpecialInstruction"].value;
  //   // this.updaterequestdata.Safety_Precautions = this.safetyprecdata.map(obj => obj.id).join(",");//this.RequestForm.controls["Safetyprecaustion"].value;
  //   // this.updaterequestdata.Safety_Precautions =  badarray.toString();

  //   if (this.NewRequestData.Request_status == "Draft") {
  //     this.updaterequestdata.Request_status = "Hold";
  //   } else {
  //     this.updaterequestdata.Request_status =
  //       this.RequestForm.controls["Status"].value;
  //   }

  //   this.updaterequestdata.Request_status = data;
  //   var badarray = [];
  //   var roomoarr = [];
  //   this.Badges.forEach((x) => {
  //     badarray.push(x["badgeId"]);
  //   });
  //   this.Rooms.forEach((x) => {
  //     roomoarr.push(x["room_id"]);
  //   });
  //   this.updaterequestdata.Room_Nos =
  //     this.RequestForm.controls["Room"].value.toString();

  //   this.updaterequestdata.Activity =
  //     this.RequestForm.controls["Activity"].value;
  //   // this.updaterequestdata.Badge_Numbers = this.RequestForm.controls["BADGENUMBER"].value;
  //   this.updaterequestdata.Badge_Numbers =
  //     this.RequestForm.controls["BADGENUMBER"].value.toString();
  //   // this.updaterequestdata.Site_Id = this.RequestForm.controls["Site"].value;
  //   // this.updaterequestdata.Building_Id =
  //   //   this.RequestForm.controls["Building"].value;
  //   this.updaterequestdata.Building_Id = data["Building_Id"];
  //   this.updaterequestdata.Room_Type =
  //     this.RequestForm.controls["FloorName"].value;
  //   // this.updaterequestdata.Request_Date = this.RequestForm.controls["Requestdate"].value;
  //   this.updaterequestdata.Company_Name =
  //     this.RequestForm.controls["Companyname"].value;
  //   this.updaterequestdata.Sub_Contractor_Id =
  //     this.RequestForm.controls["SubContractor"].value;
  //   this.updaterequestdata.teamId = this.RequestForm.controls["Team"].value;
  //   this.updaterequestdata.Foreman = this.RequestForm.controls["Foreman"].value;
  //   this.updaterequestdata.Foreman_Phone_Number =
  //     this.RequestForm.controls["ForemanPhone"].value;
  //   this.updaterequestdata.Type_Of_Activity_Id =
  //     this.RequestForm.controls["TypeActivity"].value;
  //   let workdate = this.datePipe.transform(
  //     this.RequestForm.controls["Startdate"].value,
  //     "yyyy-MM-dd"
  //   );
  //   let newworkdate = this.datePipe.transform(
  //     this.RequestForm.controls["newWorkDate"].value,
  //     "yyyy-MM-dd"
  //   );
  //   this.updaterequestdata.night_shift =
  //     this.RequestForm.controls["night_shift"].value;
  //     // if(this.isValidDateFormat(this.RequestForm.controls["newWorkDate"].value)) {
  //     //   let newworkdate = this.datePipe.transform(
  //     //     this.RequestForm.controls["newWorkDate"].value,
  //     //     "yyyy-MM-dd"
  //     //   );
  //     //   this.updaterequestdata.new_date = newworkdate;
  //     // } else {
  //     //   this.updaterequestdata.new_date = "";
  //     // }
  //     this.updaterequestdata.new_date = newworkdate;
  //     this.updaterequestdata.new_end_time =
  //     this.RequestForm.controls["new_end_time"].value;
  //   this.updaterequestdata.Working_Date = workdate;
  //   this.updaterequestdata.Start_Time =
  //     this.RequestForm.controls["StartTime"].value;
  //   this.updaterequestdata.End_Time =
  //     this.RequestForm.controls["EndTime"].value;
  //   // this.updaterequestdata.Room_Type =
  //   //   this.RequestForm.controls["RoomType"].value;
  //   // this.updaterequestdata.Crane_Requested =
  //   //   this.RequestForm.controls["CMTdata"].value;
  //   this.updaterequestdata.Crane_Number =
  //     this.RequestForm.controls["CmtValue"].value;
  //   this.updaterequestdata.Tools = this.RequestForm.controls["Tools"].value;
  //   this.updaterequestdata.Machinery =
  //     this.RequestForm.controls["Machinery"].value;
  //   this.updaterequestdata.Hot_work =
  //     this.RequestForm.controls["HOTWORK"].value;
  //   this.updaterequestdata.Certified_Person =
  //     this.RequestForm.controls["CertifiedPerson"].value;
  //   this.updaterequestdata.LOTO_Procedure =
  //     this.RequestForm.controls["LOTOPROCEDURE"].value;
  //   this.updaterequestdata.LOTO_Number =
  //     this.RequestForm.controls["LOTONumber"].value;

  //   this.updaterequestdata.Power_Off_Required =
  //     this.RequestForm.controls["Poweroff"].value;
  //   this.updaterequestdata.Number_Of_Workers =
  //     this.RequestForm.controls["peopleinvalidcount"].value;
  //   this.updaterequestdata.Notes = this.RequestForm.controls["Note"].value;
  //   this.updaterequestdata.Safety_Precautions =
  //     this.RequestForm.controls["Safetyprecaustion"].value.toString();
  //   this.updaterequestdata.rams_number = this.RequestForm.controls["RAMSNumber"].value;

  //   // new fields add

  //   this.updaterequestdata.name_of_the_fire_watcher = this.RequestForm.controls["fireWatcher"].value;
  //   this.updaterequestdata.phone_number_of_fire_watcher = this.RequestForm.controls["fireWatcherNumber"].value;

  //   this.updaterequestdata.tasks_in_progress_in_the_area = this.RequestForm.controls["floatLabel1"].value;
  //   // this.updaterequestdata.account_during_the_work = this.RequestForm.controls["floatLabel2"].value;
  //   this.updaterequestdata.lighting_sufficiently = this.RequestForm.controls["floatLabel3"].value;
  //   this.updaterequestdata.spesific_risks_based_on_task = this.RequestForm.controls["floatLabel4"].value;
  //   this.updaterequestdata.work_environment_safety_ensured = this.RequestForm.controls["floatLabel5"].value;
  //   this.updaterequestdata.course_of_action_in_emergencies = this.RequestForm.controls["floatLabel6"].value;

  //   this.updaterequestdata.fire_watch_establish = this.RequestForm.controls["floatLabel7"].value;
  //   this.updaterequestdata.combustible_material = this.RequestForm.controls["floatLabel8"].value;
  //   this.updaterequestdata.safety_measures = this.RequestForm.controls["floatLabel9"].value;
  //   this.updaterequestdata.extinguishers_and_fire_blanket = this.RequestForm.controls["floatLabel10"].value;

  //   this.updaterequestdata.welding_activitiy = this.RequestForm.controls["NEWHOTWORK"].value;
  //   this.updaterequestdata.heat_treatment = this.RequestForm.controls["NEWHOTWORK1"].value;
  //   this.updaterequestdata.air_extraction_be_established = this.RequestForm.controls["NEWHOTWORK2"].value;

  //   // new fields added
  //   this.updaterequestdata.new_sub_contractor = this.RequestForm.controls["newSubContractor"].value;

  //   this.updaterequestdata.affecting_other_contractors = this.RequestForm.controls["floatLabel11"].value;
  //   this.updaterequestdata.other_conditions = this.RequestForm.controls["floatLabel12"].value;
  //   this.updaterequestdata.lighting_begin_work = this.RequestForm.controls["floatLabel13"].value;
  //   this.updaterequestdata.specific_risks = this.RequestForm.controls["floatLabel14"].value;
  //   this.updaterequestdata.environment_ensured = this.RequestForm.controls["floatLabel15"].value;
  //   this.updaterequestdata.course_of_action = this.RequestForm.controls["floatLabel16"].value;

  //   // electrical system
  //   this.updaterequestdata.working_on_electrical_system = this.RequestForm.controls["electricalSystem"].value;
  //   this.updaterequestdata.responsible_for_the_informed = this.RequestForm.controls["floatLabel17"].value;
  //   this.updaterequestdata.de_energized = this.RequestForm.controls["floatLabel18"].value;
  //   this.updaterequestdata.if_no_loto = this.RequestForm.controls["floatLabel19"].value;
  //   this.updaterequestdata.do_risk_assessment = this.RequestForm.controls["floatLabel20"].value;
  //   this.updaterequestdata.if_yes_loto = this.RequestForm.controls["floatLabel21"].value;
  //   this.updaterequestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value;
  //   this.updaterequestdata.electrician_certification = this.RequestForm.controls["floatLabel23"].value;

  //   // working_hazardious

  //   this.updaterequestdata.working_hazardious_substen = this.RequestForm.controls["HAZARDOUS"].value;
  //   this.updaterequestdata.relevant_mal = this.RequestForm.controls["floatLabel24"].value;
  //   this.updaterequestdata.msds = this.RequestForm.controls["floatLabel25"].value;
  //   this.updaterequestdata.equipment_taken_account = this.RequestForm.controls["floatLabel26"].value;
  //   this.updaterequestdata.ventilation = this.RequestForm.controls["floatLabel27"].value;
  //   this.updaterequestdata.hazardaus_substances = this.RequestForm.controls["floatLabel28"].value;
  //   this.updaterequestdata.storage_and_disposal = this.RequestForm.controls["floatLabel29"].value;
  //   this.updaterequestdata.reachable_case = this.RequestForm.controls["floatLabel30"].value;
  //   this.updaterequestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value;

  //   //  <!-- testing start -->

  //   this.updaterequestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value;
  //   this.updaterequestdata.transfer_of_palnt = this.RequestForm.controls["floatLabel32"].value;
  //   this.updaterequestdata.area_drained = this.RequestForm.controls["floatLabel33"].value;
  //   this.updaterequestdata.area_depressurised = this.RequestForm.controls["floatLabel34"].value;
  //   this.updaterequestdata.area_flused = this.RequestForm.controls["floatLabel35"].value;
  //   this.updaterequestdata.tank_area_container = this.RequestForm.controls["floatLabel36"].value;
  //   this.updaterequestdata.system_free_for_dust = this.RequestForm.controls["floatLabel37"].value;
  //   this.updaterequestdata.loto_plan_submitted = this.RequestForm.controls["floatLabel38"].value;

  //   // <!-- height start -->

  //   this.updaterequestdata.working_at_height = this.RequestForm.controls["WORKHEIGHT"].value;
  //   this.updaterequestdata.segragated_demarkated = this.RequestForm.controls["segragated_demarkated"].value;
  //   this.updaterequestdata.lanyard_attachments = this.RequestForm.controls["floatLabel39"].value;
  //   this.updaterequestdata.rescue_plan = this.RequestForm.controls["floatLabel40"].value;
  //   this.updaterequestdata.avoid_hazards = this.RequestForm.controls["floatLabel41"].value;
  //   this.updaterequestdata.height_training = this.RequestForm.controls["floatLabel42"].value;
  //   this.updaterequestdata.supervision = this.RequestForm.controls["floatLabel43"].value;
  //   this.updaterequestdata.shock_absorbing = this.RequestForm.controls["floatLabel44"].value;
  //   this.updaterequestdata.height_equipments = this.RequestForm.controls["floatLabel45"].value;
  //   this.updaterequestdata.vertical_life = this.RequestForm.controls["floatLabel46"].value;
  //   this.updaterequestdata.secured_falling = this.RequestForm.controls["floatLabel47"].value;
  //   this.updaterequestdata.dropped_objects = this.RequestForm.controls["floatLabel48"].value;
  //   this.updaterequestdata.safe_acces = this.RequestForm.controls["floatLabel49"].value;
  //   this.updaterequestdata.weather_acceptable = this.RequestForm.controls["floatLabel50"].value;

  //   // working_confined_spaces

  //   this.updaterequestdata.working_confined_spaces = this.RequestForm.controls["CONFINEDSPACE"].value;
  //   this.updaterequestdata.vapours_gases = this.RequestForm.controls["floatLabel51"].value;
  //   this.updaterequestdata.lel_measurement = this.RequestForm.controls["floatLabel52"].value;
  //   this.updaterequestdata.all_equipment = this.RequestForm.controls["floatLabel53"].value;
  //   this.updaterequestdata.exit_conditions = this.RequestForm.controls["floatLabel54"].value;
  //   this.updaterequestdata.communication_emergency = this.RequestForm.controls["floatLabel55"].value;
  //   this.updaterequestdata.rescue_equipments = this.RequestForm.controls["floatLabel56"].value;
  //   this.updaterequestdata.space_ventilation = this.RequestForm.controls["floatLabel57"].value;
  //   this.updaterequestdata.oxygen_meter = this.RequestForm.controls["floatLabel58"].value;

  //   // work_in_atex_area

  //   this.updaterequestdata.work_in_atex_area = this.RequestForm.controls["ATEXAREA"].value;
  //   this.updaterequestdata.ex_area_downgraded = this.RequestForm.controls["floatLabel59"].value;
  //   this.updaterequestdata.atmospheric_tester = this.RequestForm.controls["floatLabel60"].value;
  //   this.updaterequestdata.flammable_materials = this.RequestForm.controls["floatLabel61"].value;
  //   this.updaterequestdata.potential_explosive = this.RequestForm.controls["floatLabel62"].value;
  //   this.updaterequestdata.oxygen_meter_confined_spaces = this.RequestForm.controls["floatLabel63"].value;

  //   // <!-- FACILITIES LOTO start -->

  //   this.updaterequestdata.securing_facilities = this.RequestForm.controls["FACILITIESLOTO"].value;
  //   this.updaterequestdata.loto_facilities = this.RequestForm.controls["floatLabel64"].value;
  //   this.updaterequestdata.system_depressurised = this.RequestForm.controls["floatLabel65"].value;
  //   this.updaterequestdata.system_drained = this.RequestForm.controls["system_drained"].value;
  //   this.updaterequestdata.passive_pause_other = this.RequestForm.controls["floatLabel67"].value;
  //   this.updaterequestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel68"].value;
  //   this.updaterequestdata.covered_or_secured = this.RequestForm.controls["floatLabel69"].value;
  //   this.updaterequestdata.people_electrician_certification = this.RequestForm.controls["floatLabel70"].value;

  //   // excavation_works

  //   this.updaterequestdata.excavation_works = this.RequestForm.controls["ExcavationWorks"].value;
  //   this.updaterequestdata.excavation_segregated = this.RequestForm.controls["floatLabel71"].value;
  //   this.updaterequestdata.nn_standards = this.RequestForm.controls["floatLabel72"].value;
  //   this.updaterequestdata.excavation_shoring = this.RequestForm.controls["excavation_shoring"].value;
  //   this.updaterequestdata.danish_regulation = this.RequestForm.controls["floatLabel74"].value;
  //   this.updaterequestdata.safe_access_and_egress = this.RequestForm.controls["floatLabel75"].value;
  //   this.updaterequestdata.correctly_sloped = this.RequestForm.controls["floatLabel76"].value;
  //   this.updaterequestdata.inspection_dates = this.RequestForm.controls["floatLabel77"].value;
  //   this.updaterequestdata.marked_drawings = this.RequestForm.controls["floatLabel78"].value;
  //   this.updaterequestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value;

  //   // using_cranes_or_lifting

  //   this.updaterequestdata.using_cranes_or_lifting = this.RequestForm.controls["CraneLifting"].value;
  //   this.updaterequestdata.appointed_person = this.RequestForm.controls["floatLabel80"].value;
  //   this.updaterequestdata.vendor_supplier = this.RequestForm.controls["floatLabel81"].value;
  //   this.updaterequestdata.lift_plan = this.RequestForm.controls["floatLabel82"].value;
  //   this.updaterequestdata.supplied_and_inspected = this.RequestForm.controls["floatLabel83"].value;
  //   this.updaterequestdata.legal_required_certificates = this.RequestForm.controls["floatLabel84"].value;
  //   this.updaterequestdata.prapared_lifting = this.RequestForm.controls["floatLabel85"].value;
  //   this.updaterequestdata.lifting_task_fenced = this.RequestForm.controls["floatLabel86"].value;
  //   this.updaterequestdata.overhead_risks = this.RequestForm.controls["floatLabel87"].value;


  //   this.updaterequestdata.visible_clothing = this.RequestForm.controls["VisableClothing"].value;
  //   this.updaterequestdata.safety_shoes = this.RequestForm.controls["SafetyShoes"].value;
  //   this.updaterequestdata.helmet = this.RequestForm.controls["Helmet"].value;

  //   this.updaterequestdata.description_of_activity = this.RequestForm.controls["descriptActivity"].value;
  //   this.updaterequestdata.specific_gloves = this.RequestForm.controls["specific_gloves"].value;
  //   this.updaterequestdata.eye_protection = this.RequestForm.controls["eye_protection"].value;
  //   this.updaterequestdata.fall_protection = this.RequestForm.controls["fall_protection"].value;
  //   this.updaterequestdata.hearing_protection = this.RequestForm.controls["hearing_protection"].value;
  //   this.updaterequestdata.respiratory_protection = this.RequestForm.controls["respiratory_protection"].value;
  //   this.updaterequestdata.other_ppe = this.RequestForm.controls["other_ppe"].value;
  //   this.updaterequestdata.other_conditions_input = this.RequestForm.controls["other_conditions_input"].value;

  //   this.updaterequestdata.Power_Off_Required =
  //     this.RequestForm.controls["Poweroff"].value;
  //   this.updaterequestdata.Number_Of_Workers =
  //     this.RequestForm.controls["peopleinvalidcount"].value;
  //   this.updaterequestdata.Notes = this.RequestForm.controls["Note"].value;
  //   this.updaterequestdata.Safety_Precautions =
  //     this.RequestForm.controls["Safetyprecaustion"].value.toString();

  //   // this.updaterequestdata.rams_file = this.RequestForm.controls["rams_file"].value;

  //   let formData = new FormData();

  //   for (const [key, value] of Object.entries(this.updaterequestdata)) {
  //     formData.append(key, value as string); // Ensure values are strings if needed
  //   }

  //   // formData.append("rams_file", JSON.stringify(this.updaterequestdata.rams_file))


  //   this.requestsserivies.UpdateRequest(formData as unknown as EditRequestDto).subscribe(
  //     (res) => {
  //       this.spinner = false;
  //       this.openSnackBar("Request Updated Successfully");
  //       this.requestsserivies.SelectedRequestData = {};
  //       this.route.navigateByUrl("/user/list-request");
  //       window.location.reload();
  //     },
  //     (error) => {
  //       this.openSnackBar("Something went wrong. Plz try again later...");
  //     }
  //   );
  // }

    UpdateRequestDraftToHold(data) {
     const requiredFields = ['segragated_demarkated', 'system_drained', 'excavation_shoring'];
  requiredFields.forEach(field => {
    if (!this.RequestForm.get(field).value) {
      this.RequestForm.get(field).setValue(0);
    }
  });
    (Object as any).keys(this.RequestForm.controls).forEach((control) => {
      this.RequestForm.get(`${control}`).updateValueAndValidity();
      this.RequestForm.get(`${control}`).markAsTouched();
    });
    console.log("draft", data)

        if (!this.RequestForm.valid) {
    console.error("Form is invalid. Please check the following errors:");
    Object.keys(this.RequestForm.controls).forEach(controlName => {
      const control = this.RequestForm.get(controlName);
      if (control.invalid) {
        console.error(`Field ${controlName} is invalid:`, control.errors);
      }
    });
    return;
  }

    if (this.RequestForm.valid) {
      const originalData = { ...this.NewRequestData };
      var badarray = [];
      this.spinner = true;

      this.safetyprecdata.forEach((x) => {
        badarray.push(x["id"]);
      });

      const [currentDenmarkDate, currentDenmarkTime] = [
        ...config.Denmarktz.split(" "),
      ];

      console.log(currentDenmarkDate)
      console.log(currentDenmarkTime)

      // this.updaterequestdata.denmark_time = [currentDenmarkDate, currentDenmarkTime];

      this.updaterequestdata.createdTime = config.getDenmarkTime.full();
      console.log(this.updaterequestdata.createdTime, "time")

      this.updaterequestdata.Assign_Start_Time =
        this.RequestForm.controls["AssignStartTime"].value;
      this.updaterequestdata.Assign_End_Time =
        this.RequestForm.controls["AssignEndTime"].value;
      this.updaterequestdata.Special_Instructions =
        this.RequestForm.controls["SpecialInstruction"].value;
      // this.updaterequestdata.Safety_Precautions = this.safetyprecdata.map(obj => obj.id).join(",");//this.RequestForm.controls["Safetyprecaustion"].value;
      // this.updaterequestdata.Safety_Precautions =  badarray.toString();

      if (this.NewRequestData.Request_status == "Draft") {
        this.updaterequestdata.Request_status = "Hold";
        this.updaterequestdata.Request_status1 = "";
      } else {
        this.updaterequestdata.Request_status =
          this.RequestForm.controls["Status"].value;
          this.updaterequestdata.Request_status1 = 1;
      }

      this.updaterequestdata.Request_status = data;
      var badarray = [];
      var roomoarr = [];
      this.Badges.forEach((x) => {
        badarray.push(x["badgeId"]);
      });
      this.Rooms.forEach((x) => {
        roomoarr.push(x["room_id"]);
      });
      this.updaterequestdata.Room_Nos =
        this.RequestForm.controls["Room"].value.toString();
      this.updaterequestdata.permit_type =
        this.RequestForm.controls["permit_type"].value;

      this.updaterequestdata.Activity =
        this.RequestForm.controls["Activity"].value;
      // this.updaterequestdata.Badge_Numbers = this.RequestForm.controls["BADGENUMBER"].value;
      this.updaterequestdata.Badge_Numbers =
        this.RequestForm.controls["BADGENUMBER"].value.toString();
      this.updaterequestdata.Site_Id = this.RequestForm.controls["Site"].value;
      this.updaterequestdata.Building_Id =
        this.RequestForm.controls["Building"].value;
      this.updaterequestdata.Building_Id = data["Building_Id"];
      this.updaterequestdata.Room_Type =
        this.RequestForm.controls["FloorName"].value;
      // this.updaterequestdata.Request_Date = this.RequestForm.controls["Requestdate"].value;
      this.updaterequestdata.Company_Name =
        this.RequestForm.controls["Companyname"].value;
      this.updaterequestdata.Sub_Contractor_Id =
        this.RequestForm.controls["SubContractor"].value;
      this.updaterequestdata.teamId = this.RequestForm.controls["Team"].value;
      this.updaterequestdata.Foreman = this.RequestForm.controls["Foreman"].value;
      this.updaterequestdata.Foreman_Phone_Number =
        this.RequestForm.controls["ForemanPhone"].value;
      this.updaterequestdata.Type_Of_Activity_Id =
        this.RequestForm.controls["TypeActivity"].value;
      let workdate = this.datePipe.transform(
        this.RequestForm.controls["Startdate"].value,
        "yyyy-MM-dd"
      );
      let newworkdate = this.datePipe.transform(
      this.RequestForm.controls["newWorkDate"].value,
      "yyyy-MM-dd"
    );
    this.updaterequestdata.new_date = newworkdate;
      this.updaterequestdata.night_shift =
        this.RequestForm.controls["night_shift"].value;
        // if(this.isValidDateFormat(this.RequestForm.controls["newWorkDate"].value)) {
        //   let newworkdate = this.datePipe.transform(
        //     this.RequestForm.controls["newWorkDate"].value,
        //     "yyyy-MM-dd"
        //   );
        //   this.updaterequestdata.new_date = newworkdate;
        // } else {
        //   this.updaterequestdata.new_date = "";
        // }
        this.updaterequestdata.new_end_time =
        this.RequestForm.controls["new_end_time"].value;
      this.updaterequestdata.Working_Date = workdate;
      this.updaterequestdata.Start_Time =
        this.RequestForm.controls["StartTime"].value;
      this.updaterequestdata.End_Time =
        this.RequestForm.controls["EndTime"].value;
      // this.updaterequestdata.Room_Type =
      //   this.RequestForm.controls["RoomType"].value;
      // this.updaterequestdata.Crane_Requested =
      //   this.RequestForm.controls["CMTdata"].value;
      this.updaterequestdata.Crane_Number =
        this.RequestForm.controls["CmtValue"].value;
      this.updaterequestdata.Tools = this.RequestForm.controls["Tools"].value;
      this.updaterequestdata.Machinery =
        this.RequestForm.controls["Machinery"].value;
      this.updaterequestdata.Hot_work =
        this.RequestForm.controls["HOTWORK"].value;
      this.updaterequestdata.Certified_Person =
        this.RequestForm.controls["CertifiedPerson"].value;
      this.updaterequestdata.LOTO_Procedure =
        this.RequestForm.controls["LOTOPROCEDURE"].value;
      this.updaterequestdata.LOTO_Number =
        this.RequestForm.controls["LOTONumber"].value;

      this.updaterequestdata.Power_Off_Required =
        this.RequestForm.controls["Poweroff"].value;
      this.updaterequestdata.Number_Of_Workers =
        this.RequestForm.controls["peopleinvalidcount"].value;
      this.updaterequestdata.Notes = this.RequestForm.controls["Note"].value;
      this.updaterequestdata.Safety_Precautions =
        this.RequestForm.controls["Safetyprecaustion"].value.toString();
      this.updaterequestdata.rams_number = this.RequestForm.controls["RAMSNumber"].value;

      this.updaterequestdata.electrical_works =
        this.RequestForm.controls["electrical_works"].value.toString();
    this.updaterequestdata.mechanical_works =
        this.RequestForm.controls["mechanical_works"].value.toString();
      this.updaterequestdata.work_type = this.RequestForm.controls["work_type"].value; 
     this.updaterequestdata.pressure_pneumatic = this.RequestForm.controls["pressure_pneumatic"].value; 
     this.updaterequestdata.pressure_hydrostatic = this.RequestForm.controls["pressure_hydrostatic"].value;
    this.updaterequestdata.mc_number_text = this.RequestForm.controls["mc_number_text"].value;

      // new fields add

      this.updaterequestdata.name_of_the_fire_watcher = this.RequestForm.controls["fireWatcher"].value;
      this.updaterequestdata.phone_number_of_fire_watcher = this.RequestForm.controls["fireWatcherNumber"].value;

      this.updaterequestdata.tasks_in_progress_in_the_area = this.RequestForm.controls["floatLabel1"].value;
      // this.updaterequestdata.account_during_the_work = this.RequestForm.controls["floatLabel2"].value;
      this.updaterequestdata.lighting_sufficiently = this.RequestForm.controls["floatLabel3"].value;
      this.updaterequestdata.spesific_risks_based_on_task = this.RequestForm.controls["floatLabel4"].value;
      this.updaterequestdata.work_environment_safety_ensured = this.RequestForm.controls["floatLabel5"].value;
      this.updaterequestdata.course_of_action_in_emergencies = this.RequestForm.controls["floatLabel6"].value;

      this.updaterequestdata.fire_watch_establish = this.RequestForm.controls["floatLabel7"].value;
      this.updaterequestdata.combustible_material = this.RequestForm.controls["floatLabel8"].value;
      this.updaterequestdata.safety_measures = this.RequestForm.controls["floatLabel9"].value;
      this.updaterequestdata.extinguishers_and_fire_blanket = this.RequestForm.controls["floatLabel10"].value;

      this.updaterequestdata.welding_activitiy = this.RequestForm.controls["NEWHOTWORK"].value;
      this.updaterequestdata.heat_treatment = this.RequestForm.controls["NEWHOTWORK1"].value;
      this.updaterequestdata.air_extraction_be_established = this.RequestForm.controls["NEWHOTWORK2"].value;

      // new fields added
      this.updaterequestdata.new_sub_contractor = this.RequestForm.controls["newSubContractor"].value;

      this.updaterequestdata.affecting_other_contractors = this.RequestForm.controls["floatLabel11"].value;
      this.updaterequestdata.other_conditions = this.RequestForm.controls["floatLabel12"].value;
      this.updaterequestdata.lighting_begin_work = this.RequestForm.controls["floatLabel13"].value;
      this.updaterequestdata.specific_risks = this.RequestForm.controls["floatLabel14"].value;
      this.updaterequestdata.environment_ensured = this.RequestForm.controls["floatLabel15"].value;
      this.updaterequestdata.course_of_action = this.RequestForm.controls["floatLabel16"].value;

      // electrical system
      this.updaterequestdata.working_on_electrical_system = this.RequestForm.controls["electricalSystem"].value;
      this.updaterequestdata.responsible_for_the_informed = this.RequestForm.controls["floatLabel17"].value;
      this.updaterequestdata.de_energized = this.RequestForm.controls["floatLabel18"].value;
      this.updaterequestdata.if_no_loto = this.RequestForm.controls["floatLabel19"].value;
      this.updaterequestdata.do_risk_assessment = this.RequestForm.controls["floatLabel20"].value;
      this.updaterequestdata.if_yes_loto = this.RequestForm.controls["floatLabel21"].value;
      this.updaterequestdata.electricity_have_isulation = this.RequestForm.controls["floatLabel22"].value;
      this.updaterequestdata.electrician_certification = this.RequestForm.controls["floatLabel23"].value;

      // commission fields of electrical systems
    this.updaterequestdata.line_walk = this.RequestForm.controls["floatLabel102"].value;
    this.updaterequestdata.pressure_test_coordinated = this.RequestForm.controls["floatLabel103"].value;
    this.updaterequestdata.pipework_mic = this.RequestForm.controls["floatLabel104"].value;
    this.updaterequestdata.loto_plan_attached = this.RequestForm.controls["floatLabel105"].value;
    this.updaterequestdata.exclusion_zone_calculated = this.RequestForm.controls["floatLabel106"].value;
    this.updaterequestdata.pneumatic_hydrostatic = this.RequestForm.controls["floatLabel107"].value;
    this.updaterequestdata.pressure_of_the_test = this.RequestForm.controls["floatLabel108"].value;
    this.updaterequestdata.safety_valves_calibrated = this.RequestForm.controls["floatLabel109"].value;

      // working_hazardious

      this.updaterequestdata.working_hazardious_substen = this.RequestForm.controls["HAZARDOUS"].value;
      this.updaterequestdata.relevant_mal = this.RequestForm.controls["floatLabel24"].value;
      this.updaterequestdata.msds = this.RequestForm.controls["floatLabel25"].value;
      this.updaterequestdata.equipment_taken_account = this.RequestForm.controls["floatLabel26"].value;
      this.updaterequestdata.ventilation = this.RequestForm.controls["floatLabel27"].value;
      this.updaterequestdata.hazardaus_substances = this.RequestForm.controls["floatLabel28"].value;
      this.updaterequestdata.storage_and_disposal = this.RequestForm.controls["floatLabel29"].value;
      this.updaterequestdata.reachable_case = this.RequestForm.controls["floatLabel30"].value;
      this.updaterequestdata.checical_risk_assessment = this.RequestForm.controls["floatLabel31"].value;

      //  <!-- testing start -->

      this.updaterequestdata.pressure_tesing_of_equipment = this.RequestForm.controls["TESTINGs"].value;
      this.updaterequestdata.transfer_of_palnt = this.RequestForm.controls["floatLabel32"].value;
      this.updaterequestdata.area_drained = this.RequestForm.controls["floatLabel33"].value;
      this.updaterequestdata.area_depressurised = this.RequestForm.controls["floatLabel34"].value;
      this.updaterequestdata.area_flused = this.RequestForm.controls["floatLabel35"].value;
      this.updaterequestdata.tank_area_container = this.RequestForm.controls["floatLabel36"].value;
      this.updaterequestdata.system_free_for_dust = this.RequestForm.controls["floatLabel37"].value;
      this.updaterequestdata.loto_plan_submitted = this.RequestForm.controls["floatLabel38"].value;

      // <!-- height start -->

      this.updaterequestdata.working_at_height = this.RequestForm.controls["WORKHEIGHT"].value;
      this.updaterequestdata.segragated_demarkated = this.RequestForm.controls["segragated_demarkated"].value;
      this.updaterequestdata.lanyard_attachments = this.RequestForm.controls["floatLabel39"].value;
      this.updaterequestdata.rescue_plan = this.RequestForm.controls["floatLabel40"].value;
      this.updaterequestdata.avoid_hazards = this.RequestForm.controls["floatLabel41"].value;
      this.updaterequestdata.height_training = this.RequestForm.controls["floatLabel42"].value;
      this.updaterequestdata.supervision = this.RequestForm.controls["floatLabel43"].value;
      this.updaterequestdata.shock_absorbing = this.RequestForm.controls["floatLabel44"].value;
      this.updaterequestdata.height_equipments = this.RequestForm.controls["floatLabel45"].value;
      this.updaterequestdata.vertical_life = this.RequestForm.controls["floatLabel46"].value;
      this.updaterequestdata.secured_falling = this.RequestForm.controls["floatLabel47"].value;
      this.updaterequestdata.dropped_objects = this.RequestForm.controls["floatLabel48"].value;
      this.updaterequestdata.safe_acces = this.RequestForm.controls["floatLabel49"].value;
      this.updaterequestdata.weather_acceptable = this.RequestForm.controls["floatLabel50"].value;

      // working_confined_spaces

      this.updaterequestdata.working_confined_spaces = this.RequestForm.controls["CONFINEDSPACE"].value;
      this.updaterequestdata.vapours_gases = this.RequestForm.controls["floatLabel51"].value;
      this.updaterequestdata.lel_measurement = this.RequestForm.controls["floatLabel52"].value;
      this.updaterequestdata.all_equipment = this.RequestForm.controls["floatLabel53"].value;
      this.updaterequestdata.exit_conditions = this.RequestForm.controls["floatLabel54"].value;
      this.updaterequestdata.communication_emergency = this.RequestForm.controls["floatLabel55"].value;
      this.updaterequestdata.rescue_equipments = this.RequestForm.controls["floatLabel56"].value;
      this.updaterequestdata.space_ventilation = this.RequestForm.controls["floatLabel57"].value;
      this.updaterequestdata.oxygen_meter = this.RequestForm.controls["floatLabel58"].value;

      // work_in_atex_area

      this.updaterequestdata.work_in_atex_area = this.RequestForm.controls["ATEXAREA"].value;
      this.updaterequestdata.ex_area_downgraded = this.RequestForm.controls["floatLabel59"].value;
      this.updaterequestdata.atmospheric_tester = this.RequestForm.controls["floatLabel60"].value;
      this.updaterequestdata.flammable_materials = this.RequestForm.controls["floatLabel61"].value;
      this.updaterequestdata.potential_explosive = this.RequestForm.controls["floatLabel62"].value;
      this.updaterequestdata.oxygen_meter_confined_spaces = this.RequestForm.controls["floatLabel63"].value;

      // <!-- FACILITIES LOTO start -->

      this.updaterequestdata.securing_facilities = this.RequestForm.controls["FACILITIESLOTO"].value;
      this.updaterequestdata.loto_facilities = this.RequestForm.controls["floatLabel64"].value;
      this.updaterequestdata.system_depressurised = this.RequestForm.controls["floatLabel65"].value;
      this.updaterequestdata.system_drained = this.RequestForm.controls["system_drained"].value;
      this.updaterequestdata.passive_pause_other = this.RequestForm.controls["floatLabel67"].value;
      this.updaterequestdata.electricity_have_insulation = this.RequestForm.controls["floatLabel68"].value;
      this.updaterequestdata.covered_or_secured = this.RequestForm.controls["floatLabel69"].value;
      this.updaterequestdata.people_electrician_certification = this.RequestForm.controls["floatLabel70"].value;

      // excavation_works

      this.updaterequestdata.excavation_works = this.RequestForm.controls["ExcavationWorks"].value;
      this.updaterequestdata.excavation_segregated = this.RequestForm.controls["floatLabel71"].value;
      this.updaterequestdata.nn_standards = this.RequestForm.controls["floatLabel72"].value;
      this.updaterequestdata.excavation_shoring = this.RequestForm.controls["excavation_shoring"].value;
      this.updaterequestdata.danish_regulation = this.RequestForm.controls["floatLabel74"].value;
      this.updaterequestdata.safe_access_and_egress = this.RequestForm.controls["floatLabel75"].value;
      this.updaterequestdata.correctly_sloped = this.RequestForm.controls["floatLabel76"].value;
      this.updaterequestdata.inspection_dates = this.RequestForm.controls["floatLabel77"].value;
      this.updaterequestdata.marked_drawings = this.RequestForm.controls["floatLabel78"].value;
      this.updaterequestdata.underground_areas_cleared = this.RequestForm.controls["floatLabel79"].value;

      // using_cranes_or_lifting

      this.updaterequestdata.using_cranes_or_lifting = this.RequestForm.controls["CraneLifting"].value;
      this.updaterequestdata.appointed_person = this.RequestForm.controls["floatLabel80"].value;
      this.updaterequestdata.vendor_supplier = this.RequestForm.controls["floatLabel81"].value;
      this.updaterequestdata.lift_plan = this.RequestForm.controls["floatLabel82"].value;
      this.updaterequestdata.supplied_and_inspected = this.RequestForm.controls["floatLabel83"].value;
      this.updaterequestdata.legal_required_certificates = this.RequestForm.controls["floatLabel84"].value;
      this.updaterequestdata.prapared_lifting = this.RequestForm.controls["floatLabel85"].value;
      this.updaterequestdata.lifting_task_fenced = this.RequestForm.controls["floatLabel86"].value;
      this.updaterequestdata.overhead_risks = this.RequestForm.controls["floatLabel87"].value;

      // pressurization power on fields
    this.updaterequestdata.power_on = this.RequestForm.controls["Poweron"].value;
    this.updaterequestdata.responsible_for_the_area = this.RequestForm.controls["floatLabel88"].value;
    this.updaterequestdata.risk_assessment_done = this.RequestForm.controls["floatLabel89"].value;
    this.updaterequestdata.barriers_signage = this.RequestForm.controls["floatLabel90"].value;
    this.updaterequestdata.energized_been_tested = this.RequestForm.controls["floatLabel91"].value;
    this.updaterequestdata.punches_been_closed = this.RequestForm.controls["floatLabel92"].value;
    this.updaterequestdata.toct_checklist = this.RequestForm.controls["floatLabel93"].value;
    this.updaterequestdata.informed_aligned = this.RequestForm.controls["floatLabel94"].value;

        // pressurization fields
    this.updaterequestdata.pressurization = this.RequestForm.controls["Pressurization"].value;
    this.updaterequestdata.performed_approved = this.RequestForm.controls["floatLabel95"].value;
    this.updaterequestdata.flushing_approved = this.RequestForm.controls["floatLabel96"].value;
    this.updaterequestdata.mc_approved = this.RequestForm.controls["floatLabel97"].value;
    this.updaterequestdata.visual_inspection = this.RequestForm.controls["floatLabel98"].value;
    this.updaterequestdata.loto_plan_approved = this.RequestForm.controls["floatLabel99"].value;
    this.updaterequestdata.follow_media_code = this.RequestForm.controls["floatLabel100"].value;
    this.updaterequestdata.cq_safety_signs = this.RequestForm.controls["floatLabel101"].value;


      this.updaterequestdata.visible_clothing = this.RequestForm.controls["VisableClothing"].value;
      this.updaterequestdata.safety_shoes = this.RequestForm.controls["SafetyShoes"].value;
      this.updaterequestdata.helmet = this.RequestForm.controls["Helmet"].value;

      this.updaterequestdata.description_of_activity = this.RequestForm.controls["descriptActivity"].value;
      this.updaterequestdata.specific_gloves = this.RequestForm.controls["specific_gloves"].value;
      this.updaterequestdata.eye_protection = this.RequestForm.controls["eye_protection"].value;
      this.updaterequestdata.fall_protection = this.RequestForm.controls["fall_protection"].value;
      this.updaterequestdata.hearing_protection = this.RequestForm.controls["hearing_protection"].value;
      this.updaterequestdata.respiratory_protection = this.RequestForm.controls["respiratory_protection"].value;
      this.updaterequestdata.other_ppe = this.RequestForm.controls["other_ppe"].value;
      this.updaterequestdata.other_conditions_input = this.RequestForm.controls["other_conditions_input"].value;

      this.updaterequestdata.Power_Off_Required =
        this.RequestForm.controls["Poweroff"].value;
      this.updaterequestdata.Number_Of_Workers =
        this.RequestForm.controls["peopleinvalidcount"].value;
      this.updaterequestdata.Notes = this.RequestForm.controls["Note"].value;
      this.updaterequestdata.Safety_Precautions =
        this.RequestForm.controls["Safetyprecaustion"].value.toString();

                              // status Fields
      this.updaterequestdata.ConM_initials = this.RequestForm.controls["ConM_initials"].value;
      this.updaterequestdata.ConM_initials1 = this.RequestForm.controls["ConM_initials1"].value;
      this.updaterequestdata.reject_reason = this.RequestForm.controls["reject_reason"].value;
      this.updaterequestdata.cancel_reason = this.RequestForm.controls["cancel_reason"].value;

      // this.updaterequestdata.rams_file = this.RequestForm.controls["rams_file"].value;

      // Log field changes
      const changes = this.logFieldChanges(originalData, this.updaterequestdata);
      console.log('Field changes detected:', changes);
      this.updaterequestdata.fields = JSON.stringify(changes);

      let formData = new FormData();

      for (const [key, value] of Object.entries(this.updaterequestdata)) {
        formData.append(key, value as string); // Ensure values are strings if needed
      }

      // formData.append("rams_file", JSON.stringify(this.updaterequestdata.rams_file))


      this.requestsserivies.UpdateRequest(formData as unknown as EditRequestDto).subscribe(
        (res) => {
          this.spinner = false;
          this.openSnackBar("Request Updated Successfully");
          this.requestsserivies.SelectedRequestData = {};
          this.route.navigateByUrl("/user/list-request");
          window.location.reload();
        },
        (error) => {
          this.openSnackBar("Something went wrong. Plz try again later...");
        }
      );
    }
  }


  openPopUp() {
    (Object as any).keys(this.RequestForm.controls).forEach((control) => {
      this.RequestForm.get(`${control}`).updateValueAndValidity();
      this.RequestForm.get(`${control}`).markAsTouched();
    });
    console.log(this.RequestForm)
    // this.RequestForm.get("newSubContractor").markAsTouched();
    // console.log(this.RequestForm.get("newSubContractor").valid, this.RequestForm.get("newSubContractor").value)
    // if (this.RequestForm.get("newSubContractor").valid) {
    if (this.RequestForm.valid) {
      let title =
        "Can you confirm the RAMS for this work is approved by ConM/HSE?";

      let dialogRef: MatDialogRef<any> = this.dialog.open(
        RequestSaveOptionsDialogComponent,
        {
          width: "500px",
          height: "200px",
          disableClose: false,
          data: { title: title, listitemsstatus: false },
        }
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.RequestForm.controls["Status"].setValue(result.data);

        this.Requestdata.Request_status = result.data;
        this.CreateRequest();
        //this.userservices.RequestLists.push(this.RequestForm.value);
      });
    }else {
      console.log("....form invalid");
      console.error("Form is invalid. Please check the validation errors.");

  Object.keys(this.RequestForm.controls).forEach((key) => {
    const control = this.RequestForm.get(key);
    if (control && control.invalid) {
      console.error(`Field '${key}' has errors:`, control.errors);
    }
  });
}
  }

  openPopUpForDrafToHold() {

    let title =
      "Can you confirm the RAMS for this work is approved by ConM/HSE?";

    let dialogRef: MatDialogRef<any> = this.dialog.open(
      RequestSaveOptionsDialogComponent,
      {
        width: "500px",
        height: "200px",
        disableClose: false,
        data: { title: title, listitemsstatus: false },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.RequestForm.controls["Status"].setValue(result.data);

      this.Requestdata.Request_status = result.data;
      this.UpdateRequestDraftToHold(result.data);
      this.route.navigateByUrl("/user/list-request");
      //this.userservices.RequestLists.push(this.RequestForm.value);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value;

    return this.BADGENUMBERS.filter(
      (fruit) => fruit["badgeId"] === filterValue
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.Badges.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.RequestForm.controls["BADGENUMBER"].setValue(null);
  }

  remove(fruit: string): void {
    const index = this.Badges.indexOf(fruit);

    if (index >= 0) {
      this.Badges.splice(index, 1);
    }
  }

  // private _roomfilter(value: string): string[] {
  //   const filterValue = value;

  //   return this.BADGENUMBERS.filter(fruit => fruit["badgeno"] === filterValue);
  // }

  addroom(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.Rooms.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.RequestForm.controls["Room"].setValue(null);
  }

  removeroom(fruit: string): void {
    const index = this.Rooms.indexOf(fruit);

    if (index >= 0) {
      this.Rooms.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.BADGENUMBERS.forEach((x) => {
      if (x["badgeId"] == event.option.value) {
        this.Badges.push(x);
      }
    });
    this.roomInput.nativeElement.value = "";
    this.RequestForm.controls["BADGENUMBER"].setValue(null);
  }

  selectedroomno(event: MatAutocompleteSelectedEvent): void {
    this.RoomsList.forEach((x) => {
      if (x["room_id"] == event.option.value) {
        this.Rooms.push(x);
      }
    });
    //this.Rooms.push(event.option.viewValue);
    this.roomInput.nativeElement.value = "";
    this.RequestForm.controls["Room"].setValue(null);
  }
  private _roomsfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.RoomsList.filter((room) => room === filterValue);
  }

  selectedsafety(event: MatAutocompleteSelectedEvent): void {
    this.safetyList.forEach((x) => {
      if (x["id"] == event.option.value) {
        this.safetyprecdata.push(x);
      }
    });
    this.electricalList.forEach((x) => {
      if (x["id"] == event.option.value) {
        this.electricaldata.push(x);
      }
    });
    this.mechanicalList.forEach((x) => {
      if (x["id"] == event.option.value) {
        this.mechanicaldata.push(x);
      }
    });
    //this.Rooms.push(event.option.viewValue);
    this.roomInput.nativeElement.value = "";
    this.RequestForm.controls["Room"].setValue(null);
  }
  private _safetyfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.safetyList.filter((room) => room === filterValue);
  }
  

  addsafety(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.safetyprecdata.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    // this.RequestForm.controls["Safetyprecaustion"].setValue(null);
    this.RequestForm.controls["Safetyprecaustion"].setValue(
      this.safetyprecdata
    );
  }

  removesafety(fruit: string): void {
    const index = this.safetyprecdata.indexOf(fruit);

    if (index >= 0) {
      this.safetyprecdata.splice(index, 1);
    }
  }

//   EditFormDataBinding(data) {
//     console.log(data, "editdata");
//     this.RequestForm.controls["Team"].setValue(this.data["teamId"]);

//     var roomarrstr = [];
//     this.spinner = true;
//     this.requestsserivies.GetAllRoomsbyid(data["Floor_Id"]).subscribe((res) => {
//       this.spinner = false;
//       if (res["message"] == "No Floors Found") {
//         this.RoomsList = [];
//       } else {
//         this.RoomsList = res["data"];
//       }
//     });

//     var badarrstr = [];
//     var safetystr = [];
//     this.EditSafetyArray.length = 0;
//     this.EditSafetyArray = [];
//     safetystr = data["Safety_Precautions"].split(",");

//     this.selectedbuilding = data["Building_Id"]
//     // this.onFloorPlan(data.Room_Type);
//     // this.selectedbuildimg = data["Building_Id"]

//     if (this.selectedbuilding == '9') {
//       switch (data.Room_Type) {
//         case "LK1":
//           this.FloorOrdinates = this.LK1;
//           // console.log(this.FloorOrdinates, "tessssst");
//           break;

//         case "L00":
//           this.FloorOrdinates = this.L00;
//           break;

//         case "L01":
//           this.FloorOrdinates = this.L01;
//           break;

//         case "L02":
//           this.FloorOrdinates = this.L02;
//           break;

//         case "L03":
//           this.FloorOrdinates = this.L03;
//           break;

//         case "L04":
//           this.FloorOrdinates = this.L04;
//           break;

//         case "L05":
//           this.FloorOrdinates = this.L05;
//           break;

//         case "L06":
//           this.FloorOrdinates = this.L06;
//           break;

//         case "L07":
//           this.FloorOrdinates = this.L07;
//           break;

//         case "L08":
//           this.FloorOrdinates = this.L08;
//           break;

//         case "LTA":
//           this.FloorOrdinates = this.LTA;

//           break;
//       }
//     }
//     else {
//       switch (data.Room_Type) {
//         case "LK1":
//           this.FloorOrdinates = this.B2LK1;
//           // Testing
//           // console.log(this.FloorOrdinates, "tessssst");
//           break;

//         case "L00":
//           this.FloorOrdinates = this.B2L00;
//           break;

//         case "L01":
//           this.FloorOrdinates = this.B2L01;
//           break;

//         case "L02":
//           this.FloorOrdinates = this.B2L02;
//           break;

//         case "L03":
//           this.FloorOrdinates = this.B2L03;
//           break;

//         case "L04":
//           this.FloorOrdinates = this.B2L04;
//           break;

//         case "L05":
//           this.FloorOrdinates = this.B2L05;
//           break;

//         case "L06":
//           this.FloorOrdinates = this.B2L06;
//           break;

//         case "L07":
//           this.FloorOrdinates = this.B2L07;
//           break;

//         case "L08":
//           this.FloorOrdinates = this.B2L08;
//           break;
//       }
//     }

//     console.log(this.FloorOrdinates, "statinndd", data.Room_Type)
//     const roomData = data.Room_Nos.split(",");
//     this.RequestForm.controls["Room"].setValue(roomData);
//     console.log(roomData, "DEMO")

// // this.RequestForm.controls["Safetyprecaustion"].setValue(
//     //   data["Safety_Precautions"].split(",")
//     // );
//   //   const precautionIds = data["Safety_Precautions"]
//   // ? data["Safety_Precautions"].split(",").map(id => Number(id))
//   // : [];
//     let precautionIds: string[] = [];

// if (typeof data["Safety_Precautions"] === 'string') {
//   precautionIds = data["Safety_Precautions"].split(",");
// } else if (Array.isArray(data["Safety_Precautions"])) {
//   precautionIds = data["Safety_Precautions"].map(id => String(id));
// }

// this.RequestForm.controls["Safetyprecaustion"].setValue(precautionIds);

//     console.log("safetydatabinding", data["Safety_Precautions"].split(","));

//     this.Getselectedsubcntrsteams(data["Sub_Contractor_Id"]);

//     this.updaterequestdata.id = data["id"];
//     this.updaterequestdata.Building_Id = data["Building_Id"];
//     console.log("EDIT FORM", this.updaterequestdata.Building_Id)
//     this.updaterequestdata.PermitNo = data["PermitNo"];
//     this.updaterequestdata.Request_Date = data["Request_Date"];
//     this.RequestForm.controls["Companyname"].setValue(data["Company_Name"]);
//     this.RequestForm.controls["Requestdate"].setValue(data["Request_Date"]);
//     this.RequestForm.controls["SubContractor"].setValue(
//       data["Sub_Contractor_Id"] || ''
//     );
//     this.RequestForm.controls["Status"].setValue(data["Request_status"]);

//     this.RequestForm.controls["Foreman"].setValue(data["Foreman"]);
//     this.RequestForm.controls["ForemanPhone"].setValue(
//       data["Foreman_Phone_Number"]
//     );
//     this.RequestForm.controls["Site"].setValue(data["Site_Id"]);
//     this.RequestForm.controls["Activity"].setValue(data["Activity"]);
//     // this.RequestForm.controls["TypeActivity"].setValue(data["Type_Of_Activity_Id"] ? Number(data["Type_Of_Activity_Id"]) : '');
//     this.RequestForm.controls["TypeActivity"].setValue(
//       data["Type_Of_Activity_Id"] ? String(data["Type_Of_Activity_Id"]) : ''
//     );
//     this.RequestForm.controls["Building"].setValue(data["building_name"]);
//     // this.RequestForm.controls["CMTdata"].setValue(data["Crane_Requested"]);
//     this.RequestForm.controls["CmtValue"].setValue(data["Crane_Number"]);
//     this.RequestForm.controls["CertifiedPerson"].setValue(
//       data["Certified_Person"]
//     );
//     this.RequestForm.controls["EndTime"].setValue(data["End_Time"]);
//     this.RequestForm.controls["FloorName"].setValue(data["Room_Type"]);

//     if (data["Room_Type"]) {
//       let selectFloorBlocks = this.requestsserivies.generateBulidFloorData().find(item => item.planType == data["Room_Type"]);
//       console.log(selectFloorBlocks);
//       let zoneSubList = [];
//       let roomNos = data['Room_Nos'].split(',');
//       selectFloorBlocks.zoneList.map((item, i) => {
//         // item['floorName']= item['floorName'];
//         if (item['zoneSubList'].length > 0 && data['Room_Nos']) {
//           if (roomNos.length > 0) {
//             roomNos.forEach(element => {
//               let index = item['zoneSubList'].findIndex(ele => ele['value'] == element);
//               if (index > -1) {
//                 zoneSubList.push(i)
//               }
//             });
//           }
//         }
//       })
//       // remove duplicates in zoneSubList array
//       zoneSubList = zoneSubList.filter((item, index) => zoneSubList.indexOf(item) === index);
//       console.log(this.selectFloorBlocks);
//       console.log(zoneSubList);
//       if (zoneSubList.length > 0) {
//         zoneSubList.forEach(item => {
//           this.selectFloorBlocks.push({ floorName: selectFloorBlocks['zoneList'][item]['floorName'], selectedBlock: selectFloorBlocks['zoneList'][item]['zoneSubList'] });
//         });
//       }
//       console.log(this.selectFloorBlocks);
//     }

//     this.RequestForm.controls["Foreman"].setValue(data["Foreman"]);
//     this.RequestForm.controls["ForemanPhone"].setValue(
//       data["Foreman_Phone_Number"]
//     );
//     this.RequestForm.controls["HOTWORK"].setValue(parseInt(data["Hot_work"]));
//     this.RequestForm.controls["LOTONumber"].setValue(data["LOTO_Number"]);
//     this.RequestForm.controls["LOTOPROCEDURE"].setValue(data["LOTO_Procedure"]);
//     this.RequestForm.controls["Machinery"].setValue(data["Machinery"]);

//     var assstarttimestr = data["Assign_Start_Time"].split(":");
//     this.RequestForm.controls["AssignStartTime"].setValue(
//       assstarttimestr[0] + ":" + assstarttimestr[1]
//     );

//     //  this.RequestForm.controls['AssignStartTime'].setValue(data["Assign_Start_Time"]);
//     var assendtimestr = data["Assign_End_Time"].split(":");
//     this.RequestForm.controls["AssignEndTime"].setValue(
//       assendtimestr[0] + ":" + assendtimestr[1]
//     );

//     // this.RequestForm.controls['Safetyprecaustion'].setValue(data["Safety_Precautions"]);
//     //this.RequestForm.controls['Safetyprecaustion'].setValue(data["Safety_Precautions"]);
//     // console.log(this.safetyList);
//     // console.log(data["Safety_Precautions"].split(","));
//     // console.log(this.safetyList.map(obj => {
//     //   console.log(data["Safety_Precautions"].includes(obj.id))
//     //   if (data["Safety_Precautions"].includes(obj.id))
//     //     return obj;
//     // }))

//     this.RequestForm.controls["SpecialInstruction"].setValue(
//       data["Special_Instructions"]
//     );

//     this.RequestForm.controls["Note"].setValue(data["Notes"]);
//     // this.RequestForm.controls['Permitnumber'].setValue(data["Certified_Person"]);
//     this.RequestForm.controls["Poweroff"].setValue(data["Power_Off_Required"]);
//     //this.RequestForm.controls['Requestdate'].setValue(data["Certified_Person"]);
//     // var roomarrstr = [];
//     // roomarrstr = data["Room_Nos"].split(",");
//     // this.RequestForm.controls['Room'].setValue(roomarrstr);
//     this.RequestForm.controls["RoomType"].setValue(data["Room_Type"]);
//     if (data["Start_Time"] !== "00:00:00") {
//       var starttimestr = data["Start_Time"].split(":");

//       this.RequestForm.controls["StartTime"].setValue(
//         starttimestr[0] + ":" + starttimestr[1]
//       );
//     } else {
//       this.RequestForm.controls["StartTime"].setValue(null);
//     }

//     if (data["End_Time"] !== "00:00:00") {
//       var endtimestr = data["End_Time"].split(":");
//       this.RequestForm.controls["EndTime"].setValue(
//         endtimestr[0] + ":" + endtimestr[1]
//       );
//     } else {
//       this.RequestForm.controls["EndTime"].setValue(null);
//     }

//     this.RequestForm.controls["Startdate"].setValue(data["Working_Date"]);
// // this.RequestForm.controls["night_shift"].setValue(data["night_shift"]);
//     // this.isnightshiftyes = data["night_shift"] === "1";
//     const nightShiftValue = data["night_shift"] == "1" ? 1 : 0;
//     this.RequestForm.controls["night_shift"].setValue(nightShiftValue);
//     this.isnightshiftyes = nightShiftValue === 1;
//     this.RequestForm.controls["newWorkDate"].setValue(data["new_date"]);
//     this.RequestForm.controls["new_end_time"].setValue(data["new_end_time"]);
//     this.RequestForm.controls["Tools"].setValue(data["Tools"]);
//     this.RequestForm.controls["peopleinvalidcount"].setValue(
//       data["Number_Of_Workers"]
//     );
//     this.RequestForm.controls["newSubContractor"].setValue(data["new_sub_contractor"]);
//     // console.log(typeof data["affecting_other_contractors"]);
//     this.RequestForm.controls["floatLabel11"].setValue(parseInt(data["affecting_other_contractors"]));
//     this.RequestForm.controls["floatLabel12"].setValue(parseInt(data["other_conditions"]));
//     this.RequestForm.controls["other_conditions_input"].setValue(data["other_conditions_input"]);
//     this.setAndRemoveValidators(data["other_conditions_input"], 'Are there other conditions that')
//     this.RequestForm.controls["floatLabel13"].setValue(parseInt(data["lighting_begin_work"]));
//     this.RequestForm.controls["floatLabel14"].setValue(parseInt(data["specific_risks"]));
//     this.RequestForm.controls["floatLabel15"].setValue(parseInt(data["environment_ensured"]));
//     this.RequestForm.controls["floatLabel16"].setValue(parseInt(data["course_of_action"]));

//     // this.RequestForm.controls["floatLabel11"].setValue(1);
//     // this.RequestForm.patchValue({ floatLabel11: 1 });
//     this.RequestForm.controls["descriptActivity"].setValue(data["description_of_activity"]);
//     this.RequestForm.controls["RAMSNumber"].setValue(data["rams_number"]);
//     // this.images = { name: data["rams_file"] };
//     this.images = data.files.map(file => ({
//       name: file.rams_file, 
//       ...file              
//     })); 
//     console.log(this.images['name'], 'img')
//     this.RequestForm.controls["other_ppe"].setValue(data["other_ppe"]);
//     // GetselectedHOTWORKitem()

//     // hotworks points
//     this.RequestForm.controls["floatLabel1"].setValue(parseInt(data["tasks_in_progress_in_the_area"]));
//     this.RequestForm.controls["floatLabel3"].setValue(parseInt(data["lighting_sufficiently"]));
//     this.RequestForm.controls["floatLabel4"].setValue(parseInt(data["spesific_risks_based_on_task"]));
//     this.RequestForm.controls["floatLabel5"].setValue(parseInt(data["work_environment_safety_ensured"]));
//     this.RequestForm.controls["floatLabel6"].setValue(parseInt(data["course_of_action_in_emergencies"]));
//     this.RequestForm.controls["floatLabel7"].setValue(parseInt(data["fire_watch_establish"]));
//     this.RequestForm.controls["floatLabel8"].setValue(parseInt(data["combustible_material"]));
//     this.RequestForm.controls["floatLabel9"].setValue(parseInt(data["safety_measures"]));
//     this.RequestForm.controls["floatLabel10"].setValue(parseInt(data["extinguishers_and_fire_blanket"]));

//     this.RequestForm.controls["NEWHOTWORK"].setValue(parseInt(data["welding_activitiy"]));

//     if (data["welding_activitiy"] == 1) {
//       this.isnewhotworkyes = true;
//     } else {
//       this.isnewhotworkyes = false;
//     }
//     this.RequestForm.controls["NEWHOTWORK1"].setValue(parseInt(data["heat_treatment"]));
//     this.RequestForm.controls["NEWHOTWORK2"].setValue(parseInt(data["air_extraction_be_established"]));

//     // electrical system
//     this.RequestForm.controls["electricalSystem"].setValue(parseInt(data["working_on_electrical_system"]));
//     if (data["working_on_electrical_system"] == 1) {
//       this.iselectricalyes = true;
//     } else {
//       this.iselectricalyes = false;
//     }
//     this.RequestForm.controls["floatLabel17"].setValue(parseInt(data["responsible_for_the_informed"]));
//     this.RequestForm.controls["floatLabel18"].setValue(parseInt(data["de_energized"]));
//     this.RequestForm.controls["floatLabel19"].setValue(parseInt(data["if_no_loto"]));
//     this.RequestForm.controls["floatLabel20"].setValue(parseInt(data["do_risk_assessment"]));
//     this.RequestForm.controls["floatLabel21"].setValue(parseInt(data["if_yes_loto"]));
//     this.RequestForm.controls["floatLabel22"].setValue(parseInt(data["electricity_have_isulation"]));
//     this.RequestForm.controls["floatLabel23"].setValue(parseInt(data["electrician_certification"]));

//     // working_hazardious
//     this.RequestForm.controls["HAZARDOUS"].setValue(parseInt(data["working_hazardious_substen"]));
//     if (data["working_hazardious_substen"] == 1) {
//       this.ishazardousyes = true;
//     } else {
//       this.ishazardousyes = false;
//     }
//     this.RequestForm.controls["floatLabel24"].setValue(parseInt(data["relevant_mal"]));
//     this.RequestForm.controls["floatLabel25"].setValue(parseInt(data["msds"]));
//     this.RequestForm.controls["floatLabel26"].setValue(parseInt(data["equipment_taken_account"]));
//     this.RequestForm.controls["floatLabel27"].setValue(parseInt(data["ventilation"]));
//     this.RequestForm.controls["floatLabel28"].setValue(parseInt(data["hazardaus_substances"]));
//     this.RequestForm.controls["floatLabel29"].setValue(parseInt(data["storage_and_disposal"]));
//     this.RequestForm.controls["floatLabel30"].setValue(parseInt(data["reachable_case"]));
//     this.RequestForm.controls["floatLabel31"].setValue(parseInt(data["checical_risk_assessment"]));

//     //  <!-- testing start -->
//     this.RequestForm.controls["TESTINGs"].setValue(parseInt(data["pressure_tesing_of_equipment"]));
//     if (data["pressure_tesing_of_equipment"] == 1) {
//       this.istestingyes = true;
//     } else {
//       this.istestingyes = false;
//     }
//     this.RequestForm.controls["floatLabel32"].setValue(parseInt(data["transfer_of_palnt"]));
//     this.RequestForm.controls["floatLabel33"].setValue(parseInt(data["area_drained"]));
//     this.RequestForm.controls["floatLabel34"].setValue(parseInt(data["area_depressurised"]));
//     this.RequestForm.controls["floatLabel35"].setValue(parseInt(data["area_flused"]));
//     this.RequestForm.controls["floatLabel36"].setValue(parseInt(data["tank_area_container"]));
//     this.RequestForm.controls["floatLabel37"].setValue(parseInt(data["system_free_for_dust"]));
//     this.RequestForm.controls["floatLabel38"].setValue(parseInt(data["loto_plan_submitted"]));

//     // <!-- height start -->
//     this.RequestForm.controls["WORKHEIGHT"].setValue(parseInt(data["working_at_height"]));
//     if (data["working_at_height"] == 1) {
//       this.isHeightsyes = true;
//     } else {
//       this.isHeightsyes = false;
//     }
//     this.RequestForm.controls["segragated_demarkated"].setValue(parseInt(data["segragated_demarkated"]));
//     this.RequestForm.controls["floatLabel39"].setValue(parseInt(data["lanyard_attachments"]));
//     this.RequestForm.controls["floatLabel40"].setValue(parseInt(data["rescue_plan"]));
//     this.RequestForm.controls["floatLabel41"].setValue(parseInt(data["avoid_hazards"]));
//     this.RequestForm.controls["floatLabel42"].setValue(parseInt(data["height_training"]));
//     this.RequestForm.controls["floatLabel43"].setValue(parseInt(data["supervision"]));
//     this.RequestForm.controls["floatLabel44"].setValue(parseInt(data["shock_absorbing"]));
//     this.RequestForm.controls["floatLabel45"].setValue(parseInt(data["height_equipments"]));
//     this.RequestForm.controls["floatLabel46"].setValue(parseInt(data["vertical_life"]));
//     this.RequestForm.controls["floatLabel47"].setValue(parseInt(data["secured_falling"]));
//     this.RequestForm.controls["floatLabel48"].setValue(parseInt(data["dropped_objects"]));
//     this.RequestForm.controls["floatLabel49"].setValue(parseInt(data["safe_acces"]));
//     this.RequestForm.controls["floatLabel50"].setValue(parseInt(data["weather_acceptable"]));

//     // working_confined_spaces
//     this.RequestForm.controls["CONFINEDSPACE"].setValue(parseInt(data["working_confined_spaces"]));
//     if (data["working_confined_spaces"] == 1) {
//       this.isConfinedsyes = true;
//     } else {
//       this.isConfinedsyes = false;
//     }
//     this.RequestForm.controls["floatLabel51"].setValue(parseInt(data["vapours_gases"]));
//     this.RequestForm.controls["floatLabel52"].setValue(parseInt(data["lel_measurement"]));
//     this.RequestForm.controls["floatLabel53"].setValue(parseInt(data["all_equipment"]));
//     this.RequestForm.controls["floatLabel54"].setValue(parseInt(data["exit_conditions"]));
//     this.RequestForm.controls["floatLabel55"].setValue(parseInt(data["communication_emergency"]));
//     this.RequestForm.controls["floatLabel56"].setValue(parseInt(data["rescue_equipments"]));
//     this.RequestForm.controls["floatLabel57"].setValue(parseInt(data["space_ventilation"]));
//     this.RequestForm.controls["floatLabel58"].setValue(parseInt(data["oxygen_meter"]));

//     // work_in_atex_area
//     this.RequestForm.controls["ATEXAREA"].setValue(parseInt(data["work_in_atex_area"]));
//     if (data["work_in_atex_area"] == 1) {
//       this.isAtexAreayes = true;
//     } else {
//       this.isAtexAreayes = false;
//     }
//     this.RequestForm.controls["floatLabel59"].setValue(parseInt(data["ex_area_downgraded"]));
//     this.RequestForm.controls["floatLabel60"].setValue(parseInt(data["atmospheric_tester"]));
//     this.RequestForm.controls["floatLabel61"].setValue(parseInt(data["flammable_materials"]));
//     this.RequestForm.controls["floatLabel62"].setValue(parseInt(data["potential_explosive"]));
//     this.RequestForm.controls["floatLabel63"].setValue(parseInt(data["oxygen_meter_confined_spaces"]));

//     // <!-- FACILITIES LOTO start -->
//     this.RequestForm.controls["FACILITIESLOTO"].setValue(parseInt(data["securing_facilities"]));
//     if (data["securing_facilities"] == 1) {
//       this.isFacilitiesLotoyes = true;
//     } else {
//       this.isFacilitiesLotoyes = false;
//     }
//     this.RequestForm.controls["floatLabel64"].setValue(parseInt(data["loto_facilities"]));
//     this.RequestForm.controls["floatLabel65"].setValue(parseInt(data["system_depressurised"]));
//     this.RequestForm.controls["system_drained"].setValue(parseInt(data["system_drained"]));
//     this.RequestForm.controls["floatLabel67"].setValue(parseInt(data["passive_pause_other"]));
//     this.RequestForm.controls["floatLabel68"].setValue(parseInt(data["electricity_have_insulation"]));
//     this.RequestForm.controls["floatLabel69"].setValue(parseInt(data["covered_or_secured"]));
//     this.RequestForm.controls["floatLabel70"].setValue(parseInt(data["people_electrician_certification"]));

//     // excavation_works

//     this.RequestForm.controls["ExcavationWorks"].setValue(parseInt(data["excavation_works"]));
//     if (data["excavation_works"] == 1) {
//       this.isExcavationWorksyes = true;
//     } else {
//       this.isExcavationWorksyes = false;
//     }
//     this.RequestForm.controls["floatLabel71"].setValue(parseInt(data["excavation_segregated"]));
//     this.RequestForm.controls["floatLabel72"].setValue(parseInt(data["nn_standards"]));
//     this.RequestForm.controls["excavation_shoring"].setValue(parseInt(data["excavation_shoring"]));
//     this.RequestForm.controls["floatLabel74"].setValue(parseInt(data["danish_regulation"]));
//     this.RequestForm.controls["floatLabel75"].setValue(parseInt(data["safe_access_and_egress"]));
//     this.RequestForm.controls["floatLabel76"].setValue(parseInt(data["correctly_sloped"]));
//     this.RequestForm.controls["floatLabel77"].setValue(parseInt(data["inspection_dates"]));
//     this.RequestForm.controls["floatLabel78"].setValue(parseInt(data["marked_drawings"]));
//     this.RequestForm.controls["floatLabel79"].setValue(parseInt(data["underground_areas_cleared"]));

//     // using_cranes_or_lifting
//     this.RequestForm.controls["CraneLifting"].setValue(parseInt(data["using_cranes_or_lifting"]));
//     if (data["using_cranes_or_lifting"] == 1) {
//       this.isCraneLiftingyes = true;
//     } else {
//       this.isCraneLiftingyes = false;
//     }
//     this.RequestForm.controls["floatLabel80"].setValue(parseInt(data["appointed_person"]));
//     this.RequestForm.controls["floatLabel81"].setValue(parseInt(data["vendor_supplier"]));
//     this.RequestForm.controls["floatLabel82"].setValue(parseInt(data["lift_plan"]));
//     this.RequestForm.controls["floatLabel83"].setValue(parseInt(data["supplied_and_inspected"]));
//     this.RequestForm.controls["floatLabel84"].setValue(parseInt(data["legal_required_certificates"]));
//     this.RequestForm.controls["floatLabel85"].setValue(parseInt(data["prapared_lifting"]));
//     this.RequestForm.controls["floatLabel86"].setValue(parseInt(data["lifting_task_fenced"]));
//     this.RequestForm.controls["floatLabel87"].setValue(parseInt(data["overhead_risks"]));

//     this.RequestForm.controls["specific_gloves"].setValue(data["specific_gloves"]);
//     this.RequestForm.controls["eye_protection"].setValue(parseInt(data["eye_protection"]));
//     this.RequestForm.controls["fall_protection"].setValue(parseInt(data["fall_protection"]));
//     this.RequestForm.controls["hearing_protection"].setValue(parseInt(data["hearing_protection"]));
//     this.RequestForm.controls["respiratory_protection"].setValue(parseInt(data["respiratory_protection"]));



//     this.cdr.detectChanges(); // Force update

//     if (data["Crane_Requested"] === "1") {
//       this.iscmsyes = true;
//       //this.RequestForm.controls['CmtValue'].setValue(data["CmtValue"]);
//     } else {
//       this.iscmsyes = false;
//     }
 
    
//     if (data["Hot_work"] == 1) {
//       console.log('sdfsdfds');
//       this.ishotworkyes = true;
//     } else {
//       this.ishotworkyes = false;
//     }
//     if (data["LOTO_Procedure"] === "1") {
//       this.isLOTOPROCEDUREyes = true;
//     } else {
//       this.isLOTOPROCEDUREyes = false;
//     }
//   }

      EditFormDataBinding(data) {
    console.log(data, "editdata");
    
    // Initialize form controls safely
    this.RequestForm.controls["Team"].setValue(this.data["teamId"] || '');

    var roomarrstr = [];
    this.spinner = true;
    if (data["Floor_Id"]) {
        this.requestsserivies.GetAllRoomsbyid(data["Floor_Id"]).subscribe((res) => {
            this.spinner = false;
            this.RoomsList = res["message"] == "No Floors Found" ? [] : res["data"];
        });
    } else {
        this.spinner = false;
        this.RoomsList = [];
    }

    // Handle Safety Precautions

let precautionIds: (string | number)[] = [];

if (data["Safety_Precautions"]) {
    // Case 1: It's a comma-separated string
    if (typeof data["Safety_Precautions"] === 'string') {
        precautionIds = data["Safety_Precautions"].split(',')
            .filter(id => id.trim() !== '') // Remove empty values
            .map(id => {
                // Convert to number if it's a numeric string, otherwise keep as string
                const num = Number(id);
                return isNaN(num) ? id.trim() : num;
            });
    } 
    // Case 2: It's already an array
    else if (Array.isArray(data["Safety_Precautions"])) {
        precautionIds = data["Safety_Precautions"].map(item => {
            // Handle both string and number array items
            if (typeof item === 'number') return item;
            const num = Number(item);
            return isNaN(num) ? item.trim() : num;
        });
    }
}

// Set the form control value
this.RequestForm.controls["Safetyprecaustion"].setValue(precautionIds);

let electricalIds: (string | number)[] = [];

if (data["electrical_works"]) {
    // Case 1: It's a comma-separated string
    if (typeof data["electrical_works"] === 'string') {
        electricalIds = data["electrical_works"].split(',')
            .filter(id => id.trim() !== '') // Remove empty values
            .map(id => {
                // Convert to number if it's a numeric string, otherwise keep as string
                const num = Number(id);
                return isNaN(num) ? id.trim() : num;
            });
    } 
    // Case 2: It's already an array
    else if (Array.isArray(data["electrical_works"])) {
        electricalIds = data["electrical_works"].map(item => {
            // Handle both string and number array items
            if (typeof item === 'number') return item;
            const num = Number(item);
            return isNaN(num) ? item.trim() : num;
        });
    }
}

// Set the form control value
this.RequestForm.controls["electrical_works"].setValue(electricalIds);



let mechanicalIds: (string | number)[] = [];

if (data["mechanical_works"]) {
    // Case 1: It's a comma-separated string
    if (typeof data["mechanical_works"] === 'string') {
        mechanicalIds = data["mechanical_works"].split(',')
            .filter(id => id.trim() !== '') // Remove empty values
            .map(id => {
                // Convert to number if it's a numeric string, otherwise keep as string
                const num = Number(id);
                return isNaN(num) ? id.trim() : num;
            });
    } 
    // Case 2: It's already an array
    else if (Array.isArray(data["mechanical_works"])) {
        mechanicalIds = data["mechanical_works"].map(item => {
            // Handle both string and number array items
            if (typeof item === 'number') return item;
            const num = Number(item);
            return isNaN(num) ? item.trim() : num;
        });
    }
}

// Set the form control value
this.RequestForm.controls["mechanical_works"].setValue(mechanicalIds);




    // Handle Building and Floor Plans
    this.selectedbuilding = data["Building_Id"] || '';
    if (this.selectedbuilding == '9') {
        switch (data?.Room_Type) {
            case "LK1": this.FloorOrdinates = this.LK1; break;
            case "L00": this.FloorOrdinates = this.L00; break;
            case "L01": this.FloorOrdinates = this.L01; break;
            case "L02": this.FloorOrdinates = this.L02; break;
            case "L03": this.FloorOrdinates = this.L03; break;
            case "L04": this.FloorOrdinates = this.L04; break;
            case "L05": this.FloorOrdinates = this.L05; break;
            case "L06": this.FloorOrdinates = this.L06; break;
            case "L07": this.FloorOrdinates = this.L07; break;
            case "L08": this.FloorOrdinates = this.L08; break;
            case "LTA": this.FloorOrdinates = this.LTA; break;
        }
    } else {
        switch (data?.Room_Type) {
            case "LK1": this.FloorOrdinates = this.B2LK1; break;
            case "L00": this.FloorOrdinates = this.B2L00; break;
            case "L01": this.FloorOrdinates = this.B2L01; break;
            case "L02": this.FloorOrdinates = this.B2L02; break;
            case "L03": this.FloorOrdinates = this.B2L03; break;
            case "L04": this.FloorOrdinates = this.B2L04; break;
            case "L05": this.FloorOrdinates = this.B2L05; break;
            case "L06": this.FloorOrdinates = this.B2L06; break;
            case "L07": this.FloorOrdinates = this.B2L07; break;
            case "L08": this.FloorOrdinates = this.B2L08; break;
        }
    }

    // Handle Room Numbers
    const roomData = data?.Room_Nos ? data.Room_Nos.split(",") : [];
    this.RequestForm.controls["Room"].setValue(roomData);

    // Update request data
    this.updaterequestdata.id = data["id"] || '';
    this.updaterequestdata.Building_Id = data["Building_Id"] || '';
    this.updaterequestdata.PermitNo = data["PermitNo"] || '';
    this.updaterequestdata.Request_Date = data["Request_Date"] || '';

    // Set form values with proper null checks
    this.RequestForm.controls["Companyname"].setValue(data["Company_Name"] || '');
    this.RequestForm.controls["Requestdate"].setValue(data["Request_Date"] || '');
    this.RequestForm.controls["SubContractor"].setValue(data["Sub_Contractor_Id"] || '');
    this.RequestForm.controls["Status"].setValue(data["Request_status"] || '');
    this.RequestForm.controls["Foreman"].setValue(data["Foreman"] || '');
    this.RequestForm.controls["ForemanPhone"].setValue(data["Foreman_Phone_Number"] || '');
    this.RequestForm.controls["Site"].setValue(data["Site_Id"] || '');
    this.RequestForm.controls["Activity"].setValue(data["Activity"] || '');
    // this.RequestForm.controls["TypeActivity"].setValue(data["Type_Of_Activity_Id"] ? String(data["Type_Of_Activity_Id"]) : '');
    this.RequestForm.controls["TypeActivity"].setValue(data["Type_Of_Activity_Id"] ? Number(data["Type_Of_Activity_Id"]) : '');
    this.RequestForm.controls["Building"].setValue(data["building_name"] || '');
    this.RequestForm.controls["CmtValue"].setValue(data["Crane_Number"] || '');
    this.RequestForm.controls["CertifiedPerson"].setValue(data["Certified_Person"] || '');
    this.RequestForm.controls["FloorName"].setValue(data["Room_Type"] || '');
    this.RequestForm.controls["descriptActivity"].setValue(data["description_of_activity"] || '');
     this.RequestForm.controls["RAMSNumber"].setValue(data["rams_number"] || '');
     this.RequestForm.controls["permit_type"].setValue(data["permit_type"] || '');
     this.RequestForm.controls["work_type"].setValue(data["work_type"] || '');

    // Handle Room Type and Zone selection
    if (data["Room_Type"] && data["Room_Nos"]) {
        let selectFloorBlocks = this.requestsserivies.generateBulidFloorData().find(item => item.planType == data["Room_Type"]);
        if (selectFloorBlocks) {
            let zoneSubList = [];
            let roomNos = data['Room_Nos'].split(',');
            selectFloorBlocks.zoneList.forEach((item, i) => {
                if (item['zoneSubList']?.length > 0) {
                    roomNos.forEach(element => {
                        if (item['zoneSubList'].findIndex(ele => ele['value'] == element) > -1) {
                            zoneSubList.push(i);
                        }
                    });
                }
            });
            
            zoneSubList = zoneSubList.filter((item, index) => zoneSubList.indexOf(item) === index);
            
            zoneSubList.forEach(item => {
                this.selectFloorBlocks.push({
                    floorName: selectFloorBlocks['zoneList'][item]['floorName'], 
                    selectedBlock: selectFloorBlocks['zoneList'][item]['zoneSubList']
                });
            });
        }
    }

    // Handle time values
    const setTimeControl = (controlName, timeValue, defaultValue = null) => {
        if (timeValue && timeValue !== "00:00:00" && timeValue !== "0000-00-00 00:00:00") {
            const parts = timeValue.split(":");
            this.RequestForm.controls[controlName].setValue(parts[0] + ":" + parts[1]);
        } else {
            this.RequestForm.controls[controlName].setValue(defaultValue);
        }
    };

    setTimeControl("StartTime", data["Start_Time"]);
    setTimeControl("EndTime", data["End_Time"]);
    setTimeControl("AssignStartTime", data["Assign_Start_Time"]);
    setTimeControl("AssignEndTime", data["Assign_End_Time"]);

    // Handle boolean/radio values
    this.RequestForm.controls["HOTWORK"].setValue(parseInt(data["Hot_work"] || '0'));
    this.RequestForm.controls["electricalSystem"].setValue(parseInt(data["working_on_electrical_system"] || '0'));
    this.RequestForm.controls["HAZARDOUS"].setValue(parseInt(data["working_hazardious_substen"] || '0'));
    this.RequestForm.controls["TESTINGs"].setValue(parseInt(data["pressure_tesing_of_equipment"] || '0'));
    this.RequestForm.controls["WORKHEIGHT"].setValue(parseInt(data["working_at_height"] || '0'));
    this.RequestForm.controls["CONFINEDSPACE"].setValue(parseInt(data["working_confined_spaces"] || '0'));
    this.RequestForm.controls["ATEXAREA"].setValue(parseInt(data["work_in_atex_area"] || '0'));
    this.RequestForm.controls["FACILITIESLOTO"].setValue(parseInt(data["securing_facilities"] || '0'));
    this.RequestForm.controls["ExcavationWorks"].setValue(parseInt(data["excavation_works"] || '0'));
    this.RequestForm.controls["CraneLifting"].setValue(parseInt(data["using_cranes_or_lifting"] || '0'));
    this.RequestForm.controls["Poweron"].setValue(parseInt(data["power_on"] || '0'));
    this.RequestForm.controls["Pressurization"].setValue(parseInt(data["pressurization"] || '0'));
    this.RequestForm.controls["NEWHOTWORK"].setValue(parseInt(data["welding_activitiy"] || '0'));
    this.RequestForm.controls["NEWHOTWORK1"].setValue(parseInt(data["heat_treatment"] || '0'));
    this.RequestForm.controls["NEWHOTWORK2"].setValue(parseInt(data["air_extraction_be_established"] || '0'));
    this.RequestForm.controls["LOTONumber"].setValue(data["LOTO_Number"] || '');
    this.RequestForm.controls["LOTOPROCEDURE"].setValue(data["LOTO_Procedure"] || '');
    this.RequestForm.controls["Machinery"].setValue(data["Machinery"] || '');
    this.RequestForm.controls["SpecialInstruction"].setValue(data["Special_Instructions"] || '');
    // this.RequestForm.controls["Note"].setValue(data["Notes"] || '');
    this.RequestForm.controls["Poweroff"].setValue(data["Power_Off_Required"] || '');
    this.RequestForm.controls["RoomType"].setValue(data["Room_Type"] || '');
    this.RequestForm.controls["Startdate"].setValue(data["Working_Date"] || '');
    
    // Handle night shift
    const nightShiftValue = data["night_shift"] == "1" ? 1 : 0;
    this.RequestForm.controls["night_shift"].setValue(nightShiftValue);
    this.isnightshiftyes = nightShiftValue === 1;
    
    this.RequestForm.controls["newWorkDate"].setValue(data["new_date"] || '');
    this.RequestForm.controls["new_end_time"].setValue(data["new_end_time"] || '');
    this.RequestForm.controls["Tools"].setValue(data["Tools"] || '');
    this.RequestForm.controls["peopleinvalidcount"].setValue(data["Number_Of_Workers"] || '');
    this.RequestForm.controls["newSubContractor"].setValue(data["new_sub_contractor"] || '');

    this.RequestForm.controls["pressure_pneumatic"].setValue(data["pressure_pneumatic"] || '');
    this.RequestForm.controls["pressure_hydrostatic"].setValue(data["pressure_hydrostatic"] || '');
    this.RequestForm.controls["mc_number_text"].setValue(data["mc_number_text"] || '');

    // Handle conditional fields
    this.RequestForm.controls["floatLabel11"].setValue(parseInt(data["affecting_other_contractors"] || '0'));
    this.RequestForm.controls["floatLabel12"].setValue(parseInt(data["other_conditions"] || '0'));
    this.RequestForm.controls["other_conditions_input"].setValue(data["other_conditions_input"] || '');
    this.setAndRemoveValidators(data["other_conditions_input"], 'Are there other conditions that');

    this.RequestForm.controls["segragated_demarkated"].setValue(parseInt(data["segragated_demarkated"] || '0'));
    this.RequestForm.controls["system_drained"].setValue(parseInt(data["system_drained"] || '0'));
    this.RequestForm.controls["excavation_shoring"].setValue(parseInt(data["excavation_shoring"] || '0'));

    console.log("..conminitials", this.data.payload?.["ConM_initials"]);

    this.RequestForm.controls["CoMM_initials"].setValue(this.data.payload?.["CoMM_initials"] || "");
    this.RequestForm.controls["ConM_initials"].setValue(this.data.payload?.["ConM_initials"] || "");
    this.RequestForm.controls["ConM_initials1"].setValue(this.data.payload?.["ConM_initials1"] || "");
    this.RequestForm.controls["reject_reason"].setValue(this.data.payload?.["reject_reason"] || "");
    this.RequestForm.controls["cancel_reason"].setValue(this.data.payload?.["cancel_reason"] || "");

    this.RequestForm.controls["low_risk_hotwork"].setValue(this.data.payload?.["low_risk_hotwork"] || "");
    this.RequestForm.controls["high_risk_hotwork"].setValue(this.data.payload?.["high_risk_hotwork"] || "");
    this.RequestForm.controls["hot_work_checklist_filled"].setValue(this.data.payload?.["hot_work_checklist_filled"] || "");
    this.RequestForm.controls["fire_guard_present"].setValue(this.data.payload?.["fire_guard_present"] || "");    
    // Handle all the other floatLabel controls
    for (let i = 1; i <= 109; i++) {
        const controlName = `floatLabel${i}`;
        if (this.RequestForm.controls[controlName]) {
            this.RequestForm.controls[controlName].setValue(parseInt(data[this.getFloatLabelFieldName(i)] || '0'));
        }
    }

    // Handle PPE controls
    this.RequestForm.controls["specific_gloves"].setValue(data["specific_gloves"] || '');
    this.RequestForm.controls["eye_protection"].setValue(parseInt(data["eye_protection"] || '0'));
    this.RequestForm.controls["fall_protection"].setValue(parseInt(data["fall_protection"] || '0'));
    this.RequestForm.controls["hearing_protection"].setValue(parseInt(data["hearing_protection"] || '0'));
    this.RequestForm.controls["respiratory_protection"].setValue(parseInt(data["respiratory_protection"] || '0'));
    this.RequestForm.controls["other_ppe"].setValue(data["other_ppe"] || '');

    // Handle file attachments
    this.images = data.files?.map(file => ({
        name: file.rams_file, 
        ...file              
    })) || [];

    // Notes Binding
    this.notesArray = data.note?.map(notes => ({
      Note : notes?.note,
      Username : notes?.username,
    }))

    // Set boolean flags based on data
    this.iscmsyes = data["Crane_Requested"] === "1";
    this.ishotworkyes = data["Hot_work"] == 1;
    this.isLOTOPROCEDUREyes = data["LOTO_Procedure"] === "1";
    this.isnewhotworkyes = data["welding_activitiy"] == 1;
    this.iselectricalyes = data["working_on_electrical_system"] == 1;
    this.ishazardousyes = data["working_hazardious_substen"] == 1;
    this.istestingyes = data["pressure_tesing_of_equipment"] == 1;
    this.isHeightsyes = data["working_at_height"] == 1;
    this.isConfinedsyes = data["working_confined_spaces"] == 1;
    this.isAtexAreayes = data["work_in_atex_area"] == 1;
    this.isFacilitiesLotoyes = data["securing_facilities"] == 1;
    this.isExcavationWorksyes = data["excavation_works"] == 1;
    this.isCraneLiftingyes = data["using_cranes_or_lifting"] == 1;
    this.isPoweronyes = data["power_on"] == 1;
    this.isPressurizationyes = data["pressurization"] == 1
    if(data["Request_status"] == "Draft") {
      this.isstatusdraft = true;
    }
    console.log('notesarray',this.notesArray);
    this.cdr.detectChanges();
}

// Helper function to map floatLabel numbers to their corresponding field names
private getFloatLabelFieldName(index: number): string {
    const fieldMap = {
        1: 'tasks_in_progress_in_the_area',
        3: 'lighting_sufficiently',
        4: 'spesific_risks_based_on_task',
        5: 'work_environment_safety_ensured',
        6: 'course_of_action_in_emergencies',
        7: 'fire_watch_establish',
        8: 'combustible_material',
        9: 'safety_measures',
        10: 'extinguishers_and_fire_blanket',
        11: 'affecting_other_contractors',
        12: 'other_conditions',
        13: 'lighting_begin_work',
        14: 'specific_risks',
        15: 'environment_ensured',
        16: 'course_of_action',
        17: 'responsible_for_the_informed',
        18: 'de_energized',
        19: 'if_no_loto',
        20: 'do_risk_assessment',
        21: 'if_yes_loto',
        22: 'electricity_have_isulation',
        23: 'electrician_certification',
        24: 'relevant_mal',
        25: 'msds',
        26: 'equipment_taken_account',
        27: 'ventilation',
        28: 'hazardaus_substances',
        29: 'storage_and_disposal',
        30: 'reachable_case',
        31: 'checical_risk_assessment',
        32: 'transfer_of_palnt',
        33: 'area_drained',
        34: 'area_depressurised',
        35: 'area_flused',
        36: 'tank_area_container',
        37: 'system_free_for_dust',
        38: 'loto_plan_submitted',
        39: 'lanyard_attachments',
        40: 'rescue_plan',
        41: 'avoid_hazards',
        42: 'height_training',
        43: 'supervision',
        44: 'shock_absorbing',
        45: 'height_equipments',
        46: 'vertical_life',
        47: 'secured_falling',
        48: 'dropped_objects',
        49: 'safe_acces',
        50: 'weather_acceptable',
        51: 'vapours_gases',
        52: 'lel_measurement',
        53: 'all_equipment',
        54: 'exit_conditions',
        55: 'communication_emergency',
        56: 'rescue_equipments',
        57: 'space_ventilation',
        58: 'oxygen_meter',
        59: 'ex_area_downgraded',
        60: 'atmospheric_tester',
        61: 'flammable_materials',
        62: 'potential_explosive',
        63: 'oxygen_meter_confined_spaces',
        64: 'loto_facilities',
        65: 'system_depressurised',
        67: 'passive_pause_other',
        68: 'electricity_have_insulation',
        69: 'covered_or_secured',
        70: 'people_electrician_certification',
        71: 'excavation_segregated',
        72: 'nn_standards',
        74: 'danish_regulation',
        75: 'safe_access_and_egress',
        76: 'correctly_sloped',
        77: 'inspection_dates',
        78: 'marked_drawings',
        79: 'underground_areas_cleared',
        80: 'appointed_person',
        81: 'vendor_supplier',
        82: 'lift_plan',
        83: 'supplied_and_inspected',
        84: 'legal_required_certificates',
        85: 'prapared_lifting',
        86: 'lifting_task_fenced',
        87: 'overhead_risks',
        88:'responsible_for_the_area',
        89:'risk_assessment_done',
        90:'barriers_signage',
        91:'energized_been_tested',
        92:'punches_been_closed',
        93:'toct_checklist',
        94:'informed_aligned',
        95:'performed_approved',
        96:'flushing_approved',
        97:'mc_approved',
        98:'visual_inspection',
        99:'loto_plan_approved',
        100:'follow_media_code',
        101:'cq_safety_signs',
        102:'line_walk',
        103:'pressure_test_coordinated',
        104:'pipework_mic',
        105:'loto_plan_attached',
        106:'exclusion_zone_calculated',
        107: 'pneumatic_hydrostatic',
        108: 'pressure_of_the_test',
        109: 'safety_valves_calibrated',
    };
    
    return fieldMap[index] || '';
}


  GetEmployees(event) {
    let emps = [];
    let selectedbadgs = [];
    this.teamservices
      .GetAllTeamsById(Number.parseInt(event))
      .subscribe((res) => {
        emps = res["employeeIds"].split(",");
        this.spinner = true;
        this.Requestdata.teamId = event;

        this.BADGENUMBERS.forEach((p) => {
          emps.forEach((y) => {
            if (y == p["id"]) {
              selectedbadgs.push(p["badgeId"]);
            }
          });
        });
        this.RequestForm.controls["BADGENUMBER"].setValue(selectedbadgs);
        if (this.editform == true && this.BADGENUMBERS.length > 0) {
          this.RequestForm.controls["BADGENUMBER"].setValue(
            this.data["payload"]["Badge_Numbers"].split(",")
          );
        }
        this.spinner = false;
      });

    // this.empservice.GetAllEmployeesBySubContrId(id).subscribe(res => {
    //   console.log(res);
    //   // this.spinner = false;
    // if (res["data"] != undefined) {
    //   this.BADGENUMBERS = res["data"];
    // }

    // if (this.editform == true && this.BADGENUMBERS.length > 0) {

    //   this.BADGENUMBERS.forEach(x => {
    //     this.EditbadgeArray.forEach(y => {
    //       if (x["badgeId"] == y) {
    //         this.Badges.push(x);
    //       }
    //     });
    //    });

    //   }
    //   this.filteredBadges = this.RequestForm.controls["BADGENUMBER"].valueChanges.pipe(
    //     startWith(null),
    //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.BADGENUMBERS.slice()));
    // });
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, "Close", {
      duration: 2000,
    });
  }
  BacktoList() {
    this.route.navigateByUrl("/user/list-request");
  }

  // BacktoListt() {
  //   this.route.navigateByUrl("/user/new-request");
  // }

  public loadComplete(pdf: PDFDocumentProxy): void {
    for (let i = 1; i <= pdf.numPages; i++) {
      // track the current page
      let currentPage = null;
      pdf
        .getPage(i)
        .then((p) => {
          currentPage = p;
          // get the annotations of the current page
          return p.getAnnotations();
        })
        .then((ann) => {
          // ugly cast due to missing typescript definitions
          // please contribute to complete @types/pdfjs-dist
          const annotations = (<any>ann) as PDFAnnotationData[];

          annotations
            .filter((a) => a.subtype === "Widget") // get the form field annotation only
            .forEach((a) => {
              var pdfRect = [0, 0, 140, 150];

              // a.rect[0]=236;
              // a.rect[1]=700;
              // a.rect[2]=523;
              // a.rect[3]=721;
              // get the rectangle that represent the single field
              // and resize it according to the current DPI
              var scale = 1;
              var rotation = 1;

              // a.rect[0]=a.rect[0];
              // a.rect[1]=a.rect[1];
              // a.rect[2]=a.rect[2]-a.rect[0];
              // a.rect[3]=a.rect[3]-a.rect[1];
              // const fieldRect = currentPage.getViewport({ scale: scale, rotation: rotation })
              //     .convertToViewportRectangle(a.rect);
              // add the corresponding input
              this.addInput(a, a.rect);
            });
        });
    }
  }
  private createInput(annotation: PDFAnnotationData, rect: number[] = null) {
    let formControl = new FormControl(annotation.buttonValue || "");

    const input = new Inputdata();
    input.name = annotation.fieldName;

    if (annotation.subtype === "Link") {
      input.type = "button";
      input.value = annotation.buttonValue || "";
    }
    if (annotation.fieldType === "Btn") {
      input.type = "button";

      input.name = annotation.fieldName || "";
      input.value = annotation.fieldName || "";
    }

    // Calculate all the positions and si zes
    if (rect) {
      input.top = rect[1];
      input.left = rect[0];
      //input.height = (rect[3] - rect[1]);
      //input.width = (rect[2] - rect[0]);
      // input.top = rect[1];
      //input.left = rect[0];

      // input.height = rect[0] + rect[2];
      //input.width = rect[1] - rect[3];

      // input.top =  rect[0];
      // yMin = y
      // xMax = x + width
      // yMax = y + height
    }
    this.inputList.push(input);
    return formControl;
  }

  private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
    // add input to page

    // var topPos = annotation.rect[0]+ window.scrollY;
    // var leftPos = annotation.rect[1] + window.scrollX;
    //         rect[0]=topPos;
    //         rect[1]=leftPos;
    this.myForm.addControl(
      annotation.fieldName,
      this.createInput(annotation, rect)
    );

    //this.myForm.addControl('new', new FormControl(''));
  }

  public getInputPosition(input: Inputdata): any {
    if (input.value === "R1") {
      return {
        // top: `${input.top-130}px`,
        // left: `${input.left+142}px`,
        // height: `${input.height+42}px`,
        // width: `${input.width+53}px`,
        top: `208.4px`,
        left: `260.8px`,
        height: `200px`,
        width: `157px`,
      };
    } else if (input.value === "R2") {
      return {
        top: `13px`,
        left: `566.32px`,
        height: `200px`,
        width: `195px`,
      };
    } else if (input.value === "R3") {
      return {
        top: `-185.32px`,
        left: `870.84px`,
        height: `200px`,
        width: `200px`,
      };
    }
  }

  eventCheck(event) { }

  Backto() {
    console.log("test");
    this.isnewrequestcreated = false;
  }

  // validations based on permit type
  dependentSections = [
  {
    mainControl: 'TESTINGs',
    triggerValue: 1,
    dependentControls: [
      'floatLabel102', 'floatLabel103', 'floatLabel104', 'floatLabel105',
      'floatLabel106', 'floatLabel107', 'floatLabel108', 'floatLabel109'
    ]
  },
  {
    mainControl: 'floatLabel107',
    triggerValue: 1, // Trigger when "Yes" is selected
    dependentControls: ['pressure_pneumatic'] // Field to validate
  },
  {
    mainControl: 'floatLabel108',
    triggerValue: 1, // Trigger when "Yes" is selected
    dependentControls: ['pressure_hydrostatic'] // Field to validate
  },
  {
    mainControl: 'Poweron',
    triggerValue: 1,
    dependentControls: ['floatLabel88', 'floatLabel89', 'floatLabel90','floatLabel91','floatLabel92','floatLabel93','floatLabel94']
  },
  {
    mainControl: 'Pressurization',
    triggerValue: 1,
    dependentControls: ['floatLabel95', 'floatLabel96', 'floatLabel97','floatLabel98','floatLabel99','floatLabel100','floatLabel101']
  },
  {
    mainControl: 'floatLabel97',
    triggerValue: 1, // Trigger when "Yes" is selected
    dependentControls: ['mc_number_text'] // Field to validate
  }
];

updateDependentValidators() {
  const isCommissioning = this.RequestForm.get('permit_type').value === 'Commissioning';
  
  this.dependentSections.forEach(section => {
    const mainControl = this.RequestForm.get(section.mainControl);
    const mainValue = mainControl.value;
    
    if (isCommissioning) {
      // Set main control as required only if it's a top-level section
      if (!section.mainControl.startsWith('floatLabel')) { // Skip for nested controls
        mainControl.setValidators([Validators.required]);
      }
      
      // Update dependent controls
      section.dependentControls.forEach(controlName => {
        const control = this.RequestForm.get(controlName);
        if (mainValue === section.triggerValue) {
          control.setValidators([Validators.required]);
        } else {
          control.clearValidators();
        }
        control.updateValueAndValidity();
      });
    } else {
      // Clear validators
      if (!section.mainControl.startsWith('floatLabel')) {
        mainControl.clearValidators();
      }
      section.dependentControls.forEach(controlName => {
        this.RequestForm.get(controlName).clearValidators();
        this.RequestForm.get(controlName).updateValueAndValidity();
      });
    }
    
    mainControl.updateValueAndValidity();
  });
}

  setAndRemoveValidators(value, control) {
    // console.log(value, control)
    if (value == 1) {
      if (control == 'Hotwork') {
        this.RequestForm.get('floatLabel1').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel3').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel4').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel5').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel6').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel7').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel8').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel9').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel10').setValidators([Validators.required]);
      } else if (control == 'Is there be any welding activitiy?') {

        // this.RequestForm.get('floatLabel').setValidators([Validators.required]);
        this.RequestForm.get('NEWHOTWORK1').setValidators([Validators.required]);
        this.RequestForm.get('NEWHOTWORK2').setValidators([Validators.required]);
      } else if (control == 'Working on Electrical Systems') {
        this.RequestForm.get('floatLabel17').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel18').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel19').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel20').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel21').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel22').setValidators([Validators.required]);
        // this.RequestForm.get('floatLabel23').setValidators([Validators.required]);
      } else if (control == 'Working with Hazardous Substances/Chemicals') {
        // console.log("123")
        this.RequestForm.get('floatLabel24').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel25').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel26').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel27').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel28').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel29').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel30').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel31').setValidators([Validators.required]);
      }
      //  else if (control == 'Pressure testing of equipment') {
      //   this.RequestForm.get('floatLabel102').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel103').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel104').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel105').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel106').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel107').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel108').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel109').setValidators([Validators.required]);
      // } 
      else if (control == 'Working at Height') {
        this.RequestForm.get('segragated_demarkated').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel39').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel40').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel41').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel42').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel43').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel44').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel45').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel46').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel47').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel48').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel49').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel50').setValidators([Validators.required]);
      } else if (control == 'Working in Confined Spaces') {
        this.RequestForm.get('floatLabel51').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel52').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel53').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel54').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel55').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel56').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel57').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel58').setValidators([Validators.required]);

      } 
      // else if (control == 'Working in ATEX Area') {
      //   this.RequestForm.get('floatLabel59').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel60').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel61').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel62').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel63').setValidators([Validators.required]);
      // }
      //  else if (control == 'Securing Facilities (LOTO)') {
      //   this.RequestForm.get('floatLabel64').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel65').setValidators([Validators.required]);
      //   this.RequestForm.get('system_drained').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel67').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel68').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel69').setValidators([Validators.required]);
      //   this.RequestForm.get('floatLabel70').setValidators([Validators.required]);
      // } 
      else if (control == 'Excavation Works') {
        this.RequestForm.get('floatLabel71').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel72').setValidators([Validators.required]);
        this.RequestForm.get('excavation_shoring').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel74').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel75').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel76').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel77').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel78').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel79').setValidators([Validators.required]);
      } else if (control == 'Using Crane or Lifting') {
        this.RequestForm.get('floatLabel80').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel81').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel82').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel83').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel84').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel85').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel86').setValidators([Validators.required]);
        this.RequestForm.get('floatLabel87').setValidators([Validators.required]);
      } else if (control == 'Are there other conditions that') {
        // console.log("floatLabel12", control)
        this.RequestForm.get('other_conditions_input').setValidators([Validators.required]);
      }
      // control.setValidators([Validators.required]);
    }
    else {
      // control.clearValidators();
      if (control == 'Hotwork') {
        // this.RequestForm.get('fireWatcher').clearValidators();
        this.RequestForm.get('floatLabel1').clearValidators();
        this.RequestForm.get('floatLabel3').clearValidators();
        this.RequestForm.get('floatLabel4').clearValidators();
        this.RequestForm.get('floatLabel5').clearValidators();
        this.RequestForm.get('floatLabel6').clearValidators();
        this.RequestForm.get('floatLabel7').clearValidators();
        this.RequestForm.get('floatLabel8').clearValidators();
        this.RequestForm.get('floatLabel9').clearValidators();
        this.RequestForm.get('floatLabel10').clearValidators();
        this.RequestForm.get('NEWHOTWORK').clearValidators();
        this.RequestForm.get('NEWHOTWORK1').clearValidators();
        this.RequestForm.get('NEWHOTWORK2').clearValidators();
      } else if (control == 'Is there be any welding activitiy?') {

        // this.RequestForm.get('NEWHOTWORK').setValidators([Validators.required]);
        this.RequestForm.get('NEWHOTWORK1').clearValidators();
        this.RequestForm.get('NEWHOTWORK2').clearValidators();
      }
      else if (control == 'Working on Electrical Systems') {
        this.RequestForm.get('floatLabel17').clearValidators();
        this.RequestForm.get('floatLabel18').clearValidators();
        this.RequestForm.get('floatLabel19').clearValidators();
        this.RequestForm.get('floatLabel20').clearValidators();
        this.RequestForm.get('floatLabel21').clearValidators();
        this.RequestForm.get('floatLabel22').clearValidators();
        // this.RequestForm.get('floatLabel23').clearValidators();
      } else if (control == 'Working with Hazardous Substances/Chemicals') {
        // console.log("456")
        this.RequestForm.get('floatLabel24').clearValidators();
        this.RequestForm.get('floatLabel25').clearValidators();
        this.RequestForm.get('floatLabel26').clearValidators();
        this.RequestForm.get('floatLabel27').clearValidators();
        this.RequestForm.get('floatLabel28').clearValidators();
        this.RequestForm.get('floatLabel29').clearValidators();
        this.RequestForm.get('floatLabel30').clearValidators();
        this.RequestForm.get('floatLabel31').clearValidators();
      } 
      // else if (control == 'Pressure testing of equipment') {
      //   this.RequestForm.get('floatLabel32').clearValidators();
      //   this.RequestForm.get('floatLabel33').clearValidators();
      //   this.RequestForm.get('floatLabel34').clearValidators();
      //   this.RequestForm.get('floatLabel35').clearValidators();
      //   this.RequestForm.get('floatLabel36').clearValidators();
      //   this.RequestForm.get('floatLabel37').clearValidators();
      //   this.RequestForm.get('floatLabel38').clearValidators();
      // } 
      else if (control == 'Working at Height') {
        this.RequestForm.get('segragated_demarkated').clearValidators();
        this.RequestForm.get('floatLabel39').clearValidators();
        this.RequestForm.get('floatLabel40').clearValidators();
        this.RequestForm.get('floatLabel41').clearValidators();
        this.RequestForm.get('floatLabel42').clearValidators();
        this.RequestForm.get('floatLabel43').clearValidators();
        this.RequestForm.get('floatLabel44').clearValidators();
        this.RequestForm.get('floatLabel45').clearValidators();
        this.RequestForm.get('floatLabel46').clearValidators();
        this.RequestForm.get('floatLabel47').clearValidators();
        this.RequestForm.get('floatLabel48').clearValidators();
        this.RequestForm.get('floatLabel49').clearValidators();
        this.RequestForm.get('floatLabel50').clearValidators();
      } else if (control == 'Working in Confined Spaces') {
        this.RequestForm.get('floatLabel51').clearValidators();
        this.RequestForm.get('floatLabel52').clearValidators();
        this.RequestForm.get('floatLabel53').clearValidators();
        this.RequestForm.get('floatLabel54').clearValidators();
        this.RequestForm.get('floatLabel55').clearValidators();
        this.RequestForm.get('floatLabel56').clearValidators();
        this.RequestForm.get('floatLabel57').clearValidators();
        this.RequestForm.get('floatLabel58').clearValidators();
      }
      //  else if (control == 'Working in ATEX Area') {
      //   this.RequestForm.get('floatLabel59').clearValidators();
      //   this.RequestForm.get('floatLabel60').clearValidators();
      //   this.RequestForm.get('floatLabel61').clearValidators();
      //   this.RequestForm.get('floatLabel62').clearValidators();
      //   this.RequestForm.get('floatLabel63').clearValidators();
      // } 
      // else if (control == 'Securing Facilities (LOTO)') {
      //   this.RequestForm.get('floatLabel64').clearValidators();
      //   this.RequestForm.get('floatLabel65').clearValidators();
      //   this.RequestForm.get('system_drained').clearValidators();
      //   this.RequestForm.get('floatLabel67').clearValidators();
      //   this.RequestForm.get('floatLabel68').clearValidators();
      //   this.RequestForm.get('floatLabel69').clearValidators();
      //   this.RequestForm.get('floatLabel70').clearValidators();
      // }
       else if (control == 'Excavation Works') {
        this.RequestForm.get('floatLabel71').clearValidators();
        this.RequestForm.get('floatLabel72').clearValidators();
        this.RequestForm.get('excavation_shoring').clearValidators();
        this.RequestForm.get('floatLabel74').clearValidators();
        this.RequestForm.get('floatLabel75').clearValidators();
        this.RequestForm.get('floatLabel76').clearValidators();
        this.RequestForm.get('floatLabel77').clearValidators();
        this.RequestForm.get('floatLabel78').clearValidators();
        this.RequestForm.get('floatLabel79').clearValidators();
      } else if (control == 'Using Crane or Lifting') {
        this.RequestForm.get('floatLabel80').clearValidators();
        this.RequestForm.get('floatLabel81').clearValidators();
        this.RequestForm.get('floatLabel82').clearValidators();
        this.RequestForm.get('floatLabel83').clearValidators();
        this.RequestForm.get('floatLabel84').clearValidators();
        this.RequestForm.get('floatLabel85').clearValidators();
        this.RequestForm.get('floatLabel86').clearValidators();
        this.RequestForm.get('floatLabel87').clearValidators();
      } else if (control == 'Are there other conditions that') {
        // console.log("floatLabel12", control)
        this.RequestForm.get('other_conditions_input').clearValidators();;
      }
    }
    this.RequestForm.updateValueAndValidity();
  }

  // blocks : {};

  openDialog(floor, i) {
    // console.log(floor, i)
    const dialogRef = this.dialog.open(RequestBuildingModelComponent, {
      data: {
        floor: floor,
        selectFloorBlocks: this.selectFloorBlocks
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'result after area selection');
      if (result) {
        // let index = this.selectFloorBlocks.findIndex(item => (item.floorName == result.floorName) && (item.planType == result.planType))
        // if (index != -1) {
        //   this.selectFloorBlocks.splice(index, 1, result);
        // } else {
        //   this.selectFloorBlocks.push(result);
        // }
        let index = this.selectFloorBlocks.findIndex(
  item => item.floorName === result.floorName && item.planType === result.planType
);

if (index !== -1) {
  // ✅ If there are still selected blocks → update
  if (result.selectedBlock && result.selectedBlock.some((b: any) => b.isSelected)) {
    this.selectFloorBlocks.splice(index, 1, result);
  } else {
    // ❌ If no blocks are selected anymore → remove the floor entry
    this.selectFloorBlocks.splice(index, 1);
  }
} else {
  // ➕ New floor → only push if it has selected blocks
  if (result.selectedBlock && result.selectedBlock.some((b: any) => b.isSelected)) {
    this.selectFloorBlocks.push(result);
  }
}

        console.log("......selectedblocks", this.selectFloorBlocks);
        this.selectFloorBlocks.map((floor) => {
          if(floor.floorStatus == 'UC') {
            this.Requestdata.permit_under = 'Construction';
          } else if(floor.floorStatus == 'C') {
            this.Requestdata.permit_under = 'Commissioning';
          } else {
            this.Requestdata.permit_under = '';
          }
        })
      }
      // this.selectFloorBlocks.push(result)
      // console.log(this.selectFloorBlocks)
    });
  }

  selectFloorBlocks: Array<any> = [];
  // images: any;
  // isimguploaded: boolean = false;
  // base64Images: any[] = [];

  // csvInputChange(e) {
  //   for (var i = 0; i < e.target.files.length; i++) {
  //     this.images = e.target.files[i];
  //     console.log(e.target.files[i]);
  //     var reader = new FileReader();

  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsDataURL(e.target.files[i]);
  //     // this.isimguploaded = true;
  //     // const formData = new FormData();
  //     // formData.append('file', e.target.files[i]); // Append file
  //     this.RequestForm.controls["rams_file"].setValue(e.target.files[i]);
  //     // console.log(reader, "reader")
  //   }
  // }
  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   // console.log(reader, "reader")
  //   // this.base64Images.push(reader.result);
  // }

images: (File | { name: string })[] = [];
notesArray: Note[] = [];

  imagesAdd: { name: string }[] = [];

// csvInputChange(e: any): void {
//   const files = e.target.files;
//   this.images = []; // Clear previous selection

//   if (files && files.length > 0) {
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       this.images.push(file);

//       console.log(file);

//       const reader = new FileReader();
//       reader.onload = (event) => this._handleReaderLoaded(event, file);
//       reader.readAsDataURL(file);
//     }

//     // Optional: store the whole file array in form control
//     // this.RequestForm.controls["rams_file"].setValue(this.images);

//     // Or just the first one (if your form only supports one)
//     this.RequestForm.controls["rams_file"].setValue(this.images);
//   }
// }

csvInputChange(e: any): void {
  const files: FileList = e.target.files;

  if (files && files.length > 0) {
    const newFiles: File[] = Array.from(files);

      this.images = [...(this.images || []), ...newFiles];

    // Only run FileReader for real File objects
    newFiles.forEach((file: File) => {
      console.log(file);

      const reader = new FileReader();
      reader.onload = (event) => this._handleReaderLoaded(event, file);
      reader.readAsDataURL(file);
    });

    this.RequestForm.controls["rams_file"].setValue(this.images);
  }

  e.target.value = null;
}



csvInputChange1(e: any): void {
  const files = e.target.files;
  this.imagesAdd = []; // Clear previous selection

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.imagesAdd.push(file);

      console.log(file);

      const reader = new FileReader();
      reader.onload = (event) => this._handleReaderLoaded(event, file);
      reader.readAsDataURL(file);
    }
    this.FilesRequestForm.controls["rams_file"].setValue(this.imagesAdd)
    this.addRamsFile();
  }
}

// Update _handleReaderLoaded to accept file context
_handleReaderLoaded(event: any, file: File): void {
  const result = event.target.result;
  // Do what you need with the file + result
  console.log('Loaded:', file.name, result);
}

addRamsFile() {
  this.spinner = true;
  this.filesRequestData.rams_file = this.FilesRequestForm.controls["rams_file"].value;
  this.filesRequestData.userId = this.updaterequestdata.userId;
  this.filesRequestData.id = this.updaterequestdata.id;

  let formData = new FormData();
    // First: Append all normal fields except rams_file
    for (const [key, value] of Object.entries(this.filesRequestData)) {
      if (key !== 'rams_file' && value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    }
    
    // Then: Append each file under same 'rams_file[]' field
    if (this.filesRequestData.rams_file && this.filesRequestData.rams_file.length > 0) {
      (this.filesRequestData.rams_file as File[]).forEach((file: File) => {
        formData.append('rams_file[]', file);  // same field name again and again
      });
    } 
    
    this.requestsserivies.addRamsFiles(formData).subscribe(
      (res) => {
        this.spinner = false;
        this.openSnackBar("File Added Successfully");
        this.images = res.files.map(file => ({
          name: file.rams_file, 
          ...file              
        })); 
      },
      (error) => {
        this.spinner = false;
        this.openSnackBar("Something went wrong. Plz try again later...");
      }
    );
}

deleteRamsFile(data) {
  this.spinner = true;
  let deleteRamsData = {
    rams_file_id : data.rams_file_id
  }
  this.requestsserivies.deleteRamsFile(deleteRamsData).subscribe(
    (res) => {
      this.spinner = false;
      this.openSnackBar("File Deleted Successfully");
      this.images = this.images.filter((file: any) => file.rams_file_id !== data.rams_file_id);
    },
    (error) => {
      this.spinner = false;
      this.openSnackBar("Something went wrong. Plz try again later...");
    }
  );
}


}



