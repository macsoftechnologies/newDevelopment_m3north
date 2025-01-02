import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestDto, EditRequestDto, DeleteRequestDto, UpdateRequestStatusListDto, CopyRequestDto, UpdateClose_Status, RequestsbyId, RequestBySubcontractorId } from 'app/views/Models/RequestDto';
import { PlansDto } from 'app/views/Models/PlansDto';
import { SearchRequestDto } from 'app/views/Models/SearchRequestDto';
import { UpdateNotes, UpdateSafety, UpdateTime } from 'app/views/Models/MultiRequestUpdateDto';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  SelectedRequestData: any = {};
  bulidingFloorData: any = [];

  catDialogservice = new EventEmitter<any>();
  DeleteActivityEmitter = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  generateBulidFloorData() {
    this.bulidingFloorData = [
      {
        planType: "External Areas",
        zoneList: [
          {
            floorName: 'Area CT',
            zoneSubList: [
              {
                value: 'CT.E1',
                className: "CT_Dark_Red_Zones-1",
                isSelected: false
              },
              {
                value: 'CT.E2',
                className: "CT_Dark_Red_Zones-2",
                isSelected: false
              },
              {
                value: 'CT.S',
                className: "CT_Dark_Red_Zones-3",
                isSelected: false
              },
              {
                value: 'CT.E',
                className: "CT_Dark_Red_Zones-4",
                isSelected: false
              },
              {
                value: 'Cooling Tower',
                className: "CT_Dark_Cool_tower",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'Area MA-I',
            zoneSubList: [
              {
                value: 'MA40.N1',
                className: "MA_I_Blue_Zones-1",
                isSelected: false
              },
              {
                value: 'MA40.N2',
                className: "MA_I_Blue_Zones-2",
                isSelected: false
              },
              {
                value: 'MA10.E',
                className: "MA_I_Blue_Zones-3",
                isSelected: false
              },
              {
                value: 'MA40',
                className: "MA_I_Blue_Zones-4",
                isSelected: false
              },
              {
                value: 'MA70.N',
                className: "MA_I_Blue_Zones-5",
                isSelected: false
              },
              {
                value: 'MA11.N',
                className: "MA_I_Blue_Zones-6",
                isSelected: false
              },
              {
                value: 'MA11',
                className: "MA_I_Blue_Zones-7",
                isSelected: false
              },
              {
                value: 'MA10',
                className: "MA_I_Blue_Zones-8",
                isSelected: false
              },
              {
                value: 'MA70',
                className: "MA_I_Blue_Zones-9",
                isSelected: false
              },
              {
                value: 'MA11.S',
                className: "MA_I_Blue_Zones-10",
                isSelected: false
              },
              {
                value: 'MA10.S',
                className: "MA_I_Blue_Zones-11",
                isSelected: false
              },
              {
                value: 'MA70.S',
                className: "MA_I_Blue_Zones-12",
                isSelected: false
              },
            ]
          },

          {
            floorName: 'Area MA-II',
            zoneSubList: [

              {
                value: 'MA50.N1',
                className: "MA_II_Red_Zones-1",
                isSelected: false
              },
              {
                value: 'MA50.N2',
                className: "MA_II_Red_Zones-2",
                isSelected: false
              },
              {
                value: 'MA50',
                className: "MA_II_Red_Zones-3",
                isSelected: false
              },
              {
                value: 'MA80.N',
                className: "MA_II_Red_Zones-4",
                isSelected: false
              },
              {
                value: 'MA80',
                className: "MA_II_Red_Zones-5",
                isSelected: false
              },
              {
                value: 'MA20',
                className: "MA_II_Red_Zones-6",
                isSelected: false
              },
              {
                value: 'MA80.S',
                className: "MA_II_Red_Zones-7",
                isSelected: false
              },
              {
                value: 'MA20.S',
                className: "MA_II_Red_Zones-8",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'Area MA-III',
            zoneSubList: [

              {
                value: 'MA60.N1',
                className: "MA_III_Yellow_Zones-1",
                isSelected: false
              },
              {
                value: 'MA60.2',
                className: "MA_III_Yellow_Zones-2",
                isSelected: false
              },
              {
                value: 'MA60.E1',
                className: "MA_III_Yellow_Zones-3",
                isSelected: false
              },
              {
                value: 'MA60.E2',
                className: "MA_III_Yellow_Zones-4",
                isSelected: false
              },
              {
                value: 'MA31.E',
                className: "MA_III_Yellow_Zones-5",
                isSelected: false
              },
              {
                value: 'MA31.N',
                className: "MA_III_Yellow_Zones-6",
                isSelected: false
              },
              {
                value: 'MA31',
                className: "MA_III_Yellow_Zones-7",
                isSelected: false
              },
              {
                value: 'MA31.S',
                className: "MA_III_Yellow_Zones-8",
                isSelected: false
              },
              {
                value: 'MA30.S',
                className: "MA_III_Yellow_Zones-9",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'Area MB',
            zoneSubList: [

              {
                value: 'MX.N',
                className: "MB_LT_Blue_Zones-1",
                isSelected: false
              },
              {
                value: 'MX',
                className: "MB_LT_Blue_Zones-2",
                isSelected: false
              },
              {
                value: 'N2',
                className: "MB_LT_Blue_Zones-3",
                isSelected: false
              },
              {
                value: 'Road MB North',
                className: "MB_LT_Blue_Zones-4",
                isSelected: false
              },
              {
                value: 'MB.N',
                className: "MB_LT_Blue_Zones-5",
                isSelected: false
              },
              {
                value: 'MB.N',
                className: "MB_LT_Blue_Zones-6",
                isSelected: false
              },
              {
                value: 'MB.S',
                className: "MB_LT_Blue_Zones-7",
                isSelected: false
              },
              {
                value: 'MB.W',
                className: "MB_LT_Blue_Zones-8",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'Area MU',
            zoneSubList: [
              {
                value: 'MU.N',
                className: "MU90_Purple_Zones-1",
                isSelected: false
              },
              {
                value: 'MU.E1',
                className: "MU90_Purple_Zones-2",
                isSelected: false
              },
              {
                value: 'MU.W1',
                className: "MU90_Purple_Zones-3",
                isSelected: false
              },
              {
                value: 'MU',
                className: "MU90_Purple_Zones-4",
                isSelected: false
              },
              {
                value: 'MU.E2',
                className: "MU90_Purple_Zones-5",
                isSelected: false
              },
              {
                value: 'MU.S',
                className: "MU90_Purple_Zones-6",
                isSelected: false
              },
              {
                value: 'MU/W2',
                className: "MU90_Purple_Zones-7",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'Area MT-MS',
            zoneSubList: [

              {
                value: 'MS.TF.N',
                className: "MU91_Green_Zones-1",
                isSelected: false
              },
              {
                value: 'MS.N',
                className: "MU91_Green_Zones-2",
                isSelected: false
              },
              {
                value: 'MS.E',
                className: "MU91_Green_Zones-3",
                isSelected: false
              },
              {
                value: 'MT.W',
                className: "MU91_Green_Zones-4",
                isSelected: false
              },
              {
                value: 'MS.S',
                className: "MU91_Green_Zones-5",
                isSelected: false
              },
              {
                value: 'MT.N',
                className: "MU91_Green_Zones-6",
                isSelected: false
              },
              {
                value: 'MT.W',
                className: "MU91_Green_Zones-7",
                isSelected: false
              },
              {
                value: 'MT',
                className: "MU91_Green_Zones-8",
                isSelected: false
              },
              {
                value: 'MT.E',
                className: "MU91_Green_Zones-9",
                isSelected: false
              },
              {
                value: 'MT.S',
                className: "MU91_Green_Zones-10",
                isSelected: false
              },
              {
                value: 'MS.TF.S',
                className: "MU91_Green_Zones-11",
                isSelected: false
              },
              {
                value: 'MS.TF.W',
                className: "MU91_Green_Zones-12",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'Welfare',
            zoneSubList: [
              {
                value: 'Parking Area',
                className: "Welfare_Grey_Zones-1",
                isSelected: false
              },
              {
                value: '4B',
                className: "Welfare_Grey_Zones-2",
                isSelected: false
              },
              {
                value: '4A',
                className: "Welfare_Grey_Zones-3",
                isSelected: false
              },
              {
                value: '2',
                className: "Welfare_Grey_Zones-4",
                isSelected: false
              },
              {
                value: '1+3',
                className: "Welfare_Grey_Zones-5",
                isSelected: false
              },
              {
                value: '5',
                className: "Welfare_Grey_Zones-6",
                isSelected: false
              },
              {
                value: 'MAT 01',
                className: "Welfare_Grey_Zones-7",
                isSelected: false
              },
              {
                value: 'MAT01.S',
                className: "Welfare_Grey_Zones-8",
                isSelected: false
              },
              {
                value: 'Foodtruck',
                className: "Welfare_Grey_Zones-9",
                isSelected: false
              },
              {
                value: 'MAT 02.W',
                className: "Welfare_Grey_Zones-10",
                isSelected: false
              },
              {
                value: 'MAT 02',
                className: "Welfare_Grey_Zones-11",
                isSelected: false
              },
              {
                value: 'MAT 03',
                className: "Welfare_Grey_Zones-12",
                isSelected: false
              },
              {
                value: 'MAT 02.E',
                className: "Welfare_Grey_Zones-13",
                isSelected: false
              },
              {
                value: 'MAT 02.S',
                className: "Welfare_Grey_Zones-14",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'Roads',
            zoneSubList: [

              {
                value: 'Junction 24',
                className: "M3MA_Roads_Zones-1",
                isSelected: false
              },
              {
                value: 'Road MS North',
                className: "M3MA_Roads_Zones-2",
                isSelected: false
              },
              {
                value: 'Junction MS North',
                className: "M3MA_Roads_Zones-3",
                isSelected: false
              },
              {
                value: 'Road MU North',
                className: "M3MA_Roads_Zones-4",
                isSelected: false
              },
              {
                value: 'Junction MU North',
                className: "M3MA_Roads_Zones-5",
                isSelected: false
              },
              {
                value: 'Road MX North',
                className: "M3MA_Roads_Zones-6",
                isSelected: false
              },
              {
                value: 'Junction MX',
                className: "M3MA_Roads_Zones-7",
                isSelected: false
              },
              {
                value: 'Road WF North',
                className: "M3MA_Roads_Zones-8",
                isSelected: false
              },
              {
                value: 'Junction WF North',
                className: "M3MA_Roads_Zones-9",
                isSelected: false
              },
              {
                value: 'Road MS East',
                className: "M3MA_Roads_Zones-10",
                isSelected: false
              },
              {
                value: 'Road MT East',
                className: "M3MA_Roads_Zones-11",
                isSelected: false
              },
              {
                value: 'Road MS West',
                className: "M3MA_Roads_Zones-12",
                isSelected: false
              },
              {
                value: 'Road MX West',
                className: "M3MA_Roads_Zones-13",
                isSelected: false
              },
              {
                value: 'Road MB North',
                className: "M3MA_Roads_Zones-14",
                isSelected: false
              },
              {
                value: 'Road MX East',
                className: "M3MA_Roads_Zones-15",
                isSelected: false
              },
              {
                value: 'Road MB West',
                className: "M3MA_Roads_Zones-16",
                isSelected: false
              },
              {
                value: 'Road MB East',
                className: "M3MA_Roads_Zones-17",
                isSelected: false
              },
              {
                value: 'Road WF East',
                className: "M3MA_Roads_Zones-18",
                isSelected: false
              },
              {
                value: 'Junction TF',
                className: "M3MA_Roads_Zones-19",
                isSelected: false
              },
              {
                value: 'Road MS South',
                className: "M3MA_Roads_Zones-20",
                isSelected: false
              },
              {
                value: 'Junction MS South',
                className: "M3MA_Roads_Zones-21",
                isSelected: false
              },
              {
                value: 'Road MU South',
                className: "M3MA_Roads_Zones-22",
                isSelected: false
              },
              {
                value: 'Junction MU South',
                className: "M3MA_Roads_Zones-23",
                isSelected: false
              },
              {
                value: 'Road MB South',
                className: "M3MA_Roads_Zones-24",
                isSelected: false
              },
              {
                value: 'Junction MB',
                className: "M3MA_Roads_Zones-25",
                isSelected: false
              },
              {
                value: 'Road MA North',
                className: "M3MA_Roads_Zones-26",
                isSelected: false
              },
              {
                value: 'Junction MA',
                className: "M3MA_Roads_Zones-27",
                isSelected: false
              },
              {
                value: 'Road MA East',
                className: "M3MA_Roads_Zones-28",
                isSelected: false
              },
              {
                value: 'Junction 22',
                className: "M3MA_Roads_Zones-29",
                isSelected: false
              },
              {
                value: 'Road 22',
                className: "M3MA_Roads_Zones-30",
                isSelected: false
              },
              {
                value: 'Road MA South',
                className: "M3MA_Roads_Zones-31",
                isSelected: false
              },
              {
                value: 'Junction 23',
                className: "M3MA_Roads_Zones-32",
                isSelected: false
              },
              {
                value: 'Road MA West',
                className: "M3MA_Roads_Zones-33",
                isSelected: false
              }

            ]
          },
          {
            floorName: '',
            zoneSubList: [

            ]
          },

        ]
      },
      // ends external area

      // starts ma purification section


      {
        planType: "Third Floor",
        zoneList: [
          {
            floorName: 'Third Floor',
            zoneSubList: [
              {
                value: '3.418',
                className: "MA-zone40_3B-1",
                isSelected: false
              },
              {
                value: '3.400',
                className: "MA-zone40_3B-2",
                isSelected: false
              },
              {
                value: 'TR41',
                className: "MA-zone40_MA40_3A-1",
                isSelected: false
              },
              {
                value: '3.416',
                className: "MA-zone40_MA40_3A-2",
                isSelected: false
              },
              {
                value: '3.414',
                className: "MA-zone40_MA40_3A-3",
                isSelected: false
              },]
          },
        ]
      },
      {
        planType: "Roof Plan",
        zoneList: [
          {
            floorName: 'Roof Plan',
            zoneSubList: [
              {
                value: '40.RA',
                className: "MA-zone40_RA_1",
                isSelected: false
              },
              {
                value: '40.RB',
                className: "MA-zone40_RB_1",
                isSelected: false
              },
              {
                value: '11.R',
                className: "MA-zone40_11R_1",
                isSelected: false
              },
              {
                value: '10.R',
                className: "MA-zone40_10R_1",
                isSelected: false
              },
              {
                value: '70.R',
                className: "MA-zone40_70R_1",
                isSelected: false
              },
            ]
          },
        ]
      },
      // ends ma purification section

      // MU 90 section
      {
        planType: "MU90.0",
        zoneList: [
          {
            floorName: 'MU90.0A',
            zoneSubList: [
              {
                value: ' S.903',
                className: "MU90_GF-ZoneMU90_0A-1",
                isSelected: false
              }
            ]
          },

          {
            floorName: 'MU90.0B',
            zoneSubList: [
              {
                value: 'S.917',
                className: "MU90_GF-ZoneMU90_0B-1",
                isSelected: false
              },
              {
                value: 'TR92',
                className: "MU90_GF-ZoneMU90_0B-2",
                isSelected: false
              },
              {
                value: 'S.915',
                className: "MU90_GF-ZoneMU90_0B-3",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.0C',
            zoneSubList: [
              {
                value: 'S.937',
                className: "MU90_GF-ZoneMU90_0C-1",
                isSelected: false
              },
              {
                value: 'S.929',
                className: "MU90_GF-ZoneMU90_0C-2",
                isSelected: false
              },
              {
                value: 'S.921',
                className: "MU90_GF-ZoneMU90_0C-3",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'MU90.0D',
            zoneSubList: [
              {
                value: 'S.953',
                className: "MU90_GF-ZoneMU90_0D-1",
                isSelected: false
              },
              {
                value: 'S.950',
                className: "MU90_GF-ZoneMU90_0D-2",
                isSelected: false
              },
              {
                value: 'S.941',
                className: "MU90_GF-ZoneMU90_0D-3",
                isSelected: false
              },
              {
                value: 'S.945',
                className: "MU90_GF-ZoneMU90_0D-4",
                isSelected: false
              },
              {
                value: 'S.942',
                className: "MU90_GF-ZoneMU90_0D-5",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.0E',
            zoneSubList: [
              {
                value: 'S.928',
                className: "MU90_GF-ZoneMU90_0E-1",
                isSelected: false
              },
              {
                value: 'S.916',
                className: "MU90_GF-ZoneMU90_0E-2",
                isSelected: false
              },
              {
                value: 'S.908',
                className: "MU90_GF-ZoneMU90_0E-3",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.0F1',
            zoneSubList: [
              {
                value: 'S.904.2',
                className: "MU90_GF-ZoneMU90_0F1-1",
                isSelected: false
              },
              {
                value: 'S.906.1',
                className: "MU90_GF-ZoneMU90_0F1-2",
                isSelected: false
              },
              {
                value: 'S.906',
                className: "MU90_GF-ZoneMU90_0F1-3",
                isSelected: false
              },
              {
                value: 'S.904.1',
                className: "MU90_GF-ZoneMU90_0F1-4",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.0F2',
            zoneSubList: [
              {
                value: 'S.910',
                className: "MU90_GF-ZoneMU90_0F2-1",
                isSelected: false
              },
              {
                value: 'S.912',
                className: "MU90_GF-ZoneMU90_0F2-2",
                isSelected: false
              },
              {
                value: 'S.902.3',
                className: "MU90_GF-ZoneMU90_0F2-3",
                isSelected: false
              },
              {
                value: 'S.902.2',
                className: "MU90_GF-ZoneMU90_0F2-4",
                isSelected: false
              },
              {
                value: 'S.902.4',
                className: "MU90_GF-ZoneMU90_0F2-5",
                isSelected: false
              },
              {
                value: 'LI91',
                className: "MU90_GF-ZoneMU90_0F2-6",
                isSelected: false
              },
              {
                value: 'S.902.1',
                className: "MU90_GF-ZoneMU90_0F2-7",
                isSelected: false
              },
              {
                value: 'TE91',
                className: "MU90_GF-ZoneMU90_0F2-8",
                isSelected: false
              },
              {
                value: 'S.902',
                className: "MU90_GF-ZoneMU90_0F2-9",
                isSelected: false
              },
              {
                value: 'S.900',
                className: "MU90_GF-ZoneMU90_0F2-10",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.0I',
            zoneSubList: [
              {
                value: 'S.934',
                className: "MU90_GF-ZoneMU90_0I-1",
                isSelected: false
              },
              {
                value: 'S.924',
                className: "MU90_GF-ZoneMU90_0I-2",
                isSelected: false
              },
              {
                value: 'S.918',
                className: "MU90_GF-ZoneMU90_0I-3",
                isSelected: false
              },
              {
                value: 'S.914',
                className: "MU90_GF-ZoneMU90_0I-4",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.0K',
            zoneSubList: [
              {
                value: 'TR93',
                className: "MU90_GF-ZoneMU90_0K-1",
                isSelected: false
              },
              {
                value: 'S.904',
                className: "MU90_GF-ZoneMU90_0K-2",
                isSelected: false
              },
              {
                value: 'S.901',
                className: "MU90_GF-ZoneMU90_0K-3",
                isSelected: false
              },
            ]
          },

        ]
      },

      {
        planType: "MU90.1",
        zoneList: [
          {
            floorName: 'MU90.1BN',
            zoneSubList: [
              {
                value: '1.935',
                className: "MU90_1_VB-ZoneMU90_1BN-1",
                isSelected: false
              },
              {
                value: '1.931',
                className: "MU90_1_VB-ZoneMU90_1BN-2",
                isSelected: false
              },
              {
                value: '1.933',
                className: "MU90_1_VB-ZoneMU90_1BN-3",
                isSelected: false
              },
              {
                value: '1.923.1',
                className: "MU90_1_VB-ZoneMU90_1BN-4",
                isSelected: false
              },
              {
                value: '1.927',
                className: "MU90_1_VB-ZoneMU90_1BN-5",
                isSelected: false
              },
              {
                value: '1.929',
                className: "MU90_1_VB-ZoneMU90_1BN-6",
                isSelected: false
              },
              {
                value: '1.925',
                className: "MU90_1_VB-ZoneMU90_1BN-7",
                isSelected: false
              },
              {
                value: '1.919.5',
                className: "MU90_1_VB-ZoneMU90_1BN-8",
                isSelected: false
              },
              {
                value: '1.923',
                className: "MU90_1_VB-ZoneMU90_1BN-9",
                isSelected: false
              },
              {
                value: '1.921',
                className: "MU90_1_VB-ZoneMU90_1BN-10",
                isSelected: false
              },
              {
                value: 'TR92',
                className: "MU90_1_VB-ZoneMU90_1BN-11",
                isSelected: false
              },
              {
                value: '1.915',
                className: "MU90_1_VB-ZoneMU90_1BN-12",
                isSelected: false
              },
              {
                value: '1.919.2',
                className: "MU90_1_VB-ZoneMU90_1BN-13",
                isSelected: false
              },
              {
                value: '1.919.1',
                className: "MU90_1_VB-ZoneMU90_1BN-14",
                isSelected: false
              },
              {
                value: '1.919.3',
                className: "MU90_1_VB-ZoneMU90_1BN-15",
                isSelected: false
              },
              {
                value: ' S.903',
                className: "MU90_1_VB-ZoneMU90_1BN-16",
                isSelected: false
              },
              {
                value: '1.919.4',
                className: "MU90_1_VB-ZoneMU90_1BN-17",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.1BS',
            zoneSubList: [
              {
                value: '1.917',
                className: "MU90_1_VB-ZoneMU90_1BS-1",
                isSelected: false
              },
              {
                value: '1.913.5',
                className: "MU90_1_VB-ZoneMU90_1BS-2",
                isSelected: false
              },
              {
                value: '1.913.6',
                className: "MU90_1_VB-ZoneMU90_1BS-3",
                isSelected: false
              },
              {
                value: '1.913.3',
                className: "MU90_1_VB-ZoneMU90_1BS-4",
                isSelected: false
              },
              {
                value: '1.913.4',
                className: "MU90_1_VB-ZoneMU90_1BS-5",
                isSelected: false
              },
              {
                value: '1.913.2',
                className: "MU90_1_VB-ZoneMU90_1BS-6",
                isSelected: false
              },
              {
                value: '1.913',
                className: "MU90_1_VB-ZoneMU90_1BS-7",
                isSelected: false
              },
              {
                value: '1.911',
                className: "MU90_1_VB-ZoneMU90_1BS-8",
                isSelected: false
              },
              {
                value: '1.909',
                className: "MU90_1_VB-ZoneMU90_1BS-9",
                isSelected: false
              },
              {
                value: '1.913.1',
                className: "MU90_1_VB-ZoneMU90_1BS-10",
                isSelected: false
              },
              {
                value: '1.906.1',
                className: "MU90_1_VB-ZoneMU90_1BS-11",
                isSelected: false
              },
              {
                value: '1.906.2',
                className: "MU90_1_VB-ZoneMU90_1BS-12",
                isSelected: false
              },
              {
                value: '1.901',
                className: "MU90_1_VB-ZoneMU90_1BS-13",
                isSelected: false
              },
              {
                value: '1.906',
                className: "MU90_1_VB-ZoneMU90_1BS-14",
                isSelected: false
              },
              {
                value: '1.906.3',
                className: "MU90_1_VB-ZoneMU90_1BS-15",
                isSelected: false
              },
              {
                value: '1.906.4',
                className: "MU90_1_VB-ZoneMU90_1BS-16",
                isSelected: false
              },
              {
                value: '1.906.5',
                className: "MU90_1_VB-ZoneMU90_1BS-17",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.1C',
            zoneSubList: [
              {
                value: '1.937',
                className: "MU90_1_VB-ZoneMU90_1C-1",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.1D',
            zoneSubList: [
              {
                value: '1.947',
                className: "MU90_1_VB-ZoneMU90_1D-1",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'MU90.1E',
            zoneSubList: [
              {
                value: '1.951',
                className: "MU90_1_VB-ZoneMU90_1E-1",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'MU90.1F',
            zoneSubList: [
              {
                value: '1.952',
                className: "MU90_1_VB-ZoneMU90_1F-1",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'MU90.1G',
            zoneSubList: [
              {
                value: '1.950',
                className: "MU90_1_VB-ZoneMU90_1G-1",
                isSelected: false
              },
              {
                value: '1.944',
                className: "MU90_1_VB-ZoneMU90_1G-2",
                isSelected: false
              },
              {
                value: '1.940',
                className: "MU90_1_VB-ZoneMU90_1G-3",
                isSelected: false
              }


            ]
          },
          {
            floorName: 'MU90.1H',
            zoneSubList: [
              {
                value: '1.928',
                className: "MU90_1_VB-ZoneMU90_1H-1",
                isSelected: false
              },
              {
                value: '1.920',
                className: "MU90_1_VB-ZoneMU90_1H-2",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.1I',
            zoneSubList: [
              {
                value: '1.914.4',
                className: "MU90_1_VB-ZoneMU90_1I-1",
                isSelected: false
              },
              {
                value: '1.914.3',
                className: "MU90_1_VB-ZoneMU90_1I-2",
                isSelected: false
              },
              {
                value: '1.914.2',
                className: "MU90_1_VB-ZoneMU90_1I-3",
                isSelected: false
              },
              {
                value: '1.914.1',
                className: "MU90_1_VB-ZoneMU90_1I-4",
                isSelected: false
              },
              {
                value: '1.912',
                className: "MU90_1_VB-ZoneMU90_1I-5",
                isSelected: false
              },
              {
                value: '1.914',
                className: "MU90_1_VB-ZoneMU90_1I-6",
                isSelected: false
              },
              {
                value: '1.918',
                className: "MU90_1_VB-ZoneMU90_1I-7",
                isSelected: false
              },
              {
                value: '1.916',
                className: "MU90_1_VB-ZoneMU90_1I-8",
                isSelected: false
              },
              {
                value: '1.910',
                className: "MU90_1_VB-ZoneMU90_1I-9",
                isSelected: false
              },
              {
                value: '1.908.1',
                className: "MU90_1_VB-ZoneMU90_1I-10",
                isSelected: false
              },
              {
                value: '1.908.2',
                className: "MU90_1_VB-ZoneMU90_1I-11",
                isSelected: false
              },
              {
                value: '1.908.3',
                className: "MU90_1_VB-ZoneMU90_1I-12",
                isSelected: false
              },
              {
                value: '1.908',
                className: "MU90_1_VB-ZoneMU90_1I-13",
                isSelected: false
              },
              {
                value: '1.904',
                className: "MU90_1_VB-ZoneMU90_1I-14",
                isSelected: false
              },
              {
                value: '1.900.1',
                className: "MU90_1_VB-ZoneMU90_1I-15",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'MU90.1K',
            zoneSubList: [
              {
                value: '1.941',
                className: "MU90_1_VB-ZoneMU90_1K-1",
                isSelected: false
              },
              {
                value: 'TR93',
                className: "MU90_1_VB-ZoneMU90_1K-2",
                isSelected: false
              },
              {
                value: '1.930',
                className: "MU90_1_VB-ZoneMU90_1K-3",
                isSelected: false
              },
              {
                value: '1.922',
                className: "MU90_1_VB-ZoneMU90_1K-4",
                isSelected: false
              },
              {
                value: 'LI91',
                className: "MU90_1_VB-ZoneMU90_1K-5",
                isSelected: false
              },
              {
                value: 'TR91',
                className: "MU90_1_VB-ZoneMU90_1K-6",
                isSelected: false
              },
              {
                value: '1.900',
                className: "MU90_1_VB-ZoneMU90_1K-7",
                isSelected: false
              }

            ]
          },
          {
            floorName: 'MU90.1L',
            zoneSubList: [
              {
                value: '1.938',
                className: "MU90_1_VB-ZoneMU90_1L-1",
                isSelected: false
              },
              {
                value: '1.939',
                className: "MU90_1_VB-ZoneMU90_1L-2",
                isSelected: false
              },
              {
                value: '1.942',
                className: "MU90_1_VB-ZoneMU90_1L-3",
                isSelected: false
              },
              {
                value: '1.936',
                className: "MU90_1_VB-ZoneMU90_1L-4",
                isSelected: false
              },
              {
                value: '1.934',
                className: "MU90_1_VB-ZoneMU90_1L-5",
                isSelected: false
              },
              {
                value: '1.932',
                className: "MU90_1_VB-ZoneMU90_1L-6",
                isSelected: false
              },
              {
                value: '1.922.1',
                className: "MU90_1_VB-ZoneMU90_1L-7",
                isSelected: false
              }
            ]
          },
          {
            floorName: 'MU90.1M',
            zoneSubList: [
              {
                value: '1.922.1',
                className: "MU90_1_VB-ZoneMU90_1M-1",
                isSelected: false
              },
            ]
          },

        ]
      },

      {
        planType: "MU90.2",
        zoneList: [
          {
            floorName: 'MU90.2',
            zoneSubList: [
              {
                value: '2.900.2',
                className: "MU90_1_VB-ZoneMU90_2A-1",
                isSelected: false
              },
              {
                value: '2.900',
                className: "MU90_1_VB-ZoneMU90_2A-2",
                isSelected: false
              },
              {
                value: 'LI91',
                className: "MU90_1_VB-ZoneMU90_2A-3",
                isSelected: false
              },
              {
                value: 'TR91',
                className: "MU90_1_VB-ZoneMU90_2A-4",
                isSelected: false
              },
              {
                value: '2.900.1',
                className: "MU90_1_VB-ZoneMU90_2A-5",
                isSelected: false
              }
            ]
          },
        ]
      },

      {
        planType: "MU90.R",
        zoneList: [
          {
            floorName: 'MU90.R',
            zoneSubList: [
              {
                value: '90.RA',
                className: "MU90_1_VB-ZoneMU90_RA-1",
                isSelected: false
              },
              {
                value: '90.R.BW',
                className: "MU90_1_VB-ZoneMU90_R_BW-1",
                isSelected: false
              },
              {
                value: '90.R.BE',
                className: "MU90_1_VB-ZoneMU90_R_BE-1",
                isSelected: false
              }
            ]
          },
        ]
      },
      // ends MU 90 section

      // starts MU 91 section

      {
        planType: "MU91.0",
        zoneList: [
          {
            floorName: 'GroundFloor',
            zoneSubList: [
              {
                value: 'MU91.0A',
                className: "MU91-zoneMU91_0A-1",
                isSelected: false
              },

              {
                value: 'MU91.0B',
                className: "MU91-zoneMU91_0B-1",
                isSelected: false
              },

              {
                value: 'MU91.0C',
                className: "MU91-zoneMU91_0C-1",
                isSelected: false
              },
              {
                value: 'MU91.0D',
                className: "MU91-zoneMU91_0D-1",
                isSelected: false
              },
              {
                value: 'MU91.0E',
                className: "MU91-zoneMU91_0E-1",
                isSelected: false
              },
              {
                value: 'MU91.0F',
                className: "MU91-zoneMU91_0F-1",
                isSelected: false
              },
              {
                value: 'MU91.0G',
                className: "MU91-zoneMU91_0G-1",
                isSelected: false
              },
              {
                value: 'S.08',
                className: "MU91-zoneMU91_0H-1",
                isSelected: false
              },
              {
                value: 'S.05',
                className: "MU91-zoneMU91_0H-2",
                isSelected: false
              },
              {
                value: 'S.02',
                className: "MU91-zoneMU91_0H-3",
                isSelected: false
              },
              {
                value: 'S.11',
                className: "MU91-zoneMU91_0H-4",
                isSelected: false
              },
              {
                value: 'S.09',
                className: "MU91-zoneMU91_0H-5",
                isSelected: false
              },
              {
                value: 'S.07',
                className: "MU91-zoneMU91_0H-6",
                isSelected: false
              },
              {
                value: 'S.03',
                className: "MU91-zoneMU91_0H-7",
                isSelected: false
              },
              {
                value: 'S.01',
                className: "MU91-zoneMU91_0H-8",
                isSelected: false
              },
              {
                value: 'MU91.0I',
                className: "MU91-zoneMU91_0I-1",
                isSelected: false
              },
              {
                value: 'MU91.0J',
                className: "MU91-zoneMU91_0J-1",
                isSelected: false
              },
              {
                value: 'S.13',
                className: "MU91-zoneMU91_0K-1",
                isSelected: false
              },
              {
                value: 'MU91.0L',
                className: "MU91-zoneMU91_0L-1",
                isSelected: false
              },
              {
                value: 'MU91.0M',
                className: "MU91-zoneMU91_0M-1",
                isSelected: false
              },
              {
                value: 'S.10',
                className: "MU91-zoneMU91_0N-1",
                isSelected: false
              },
              {
                value: 'S.11',
                className: "MU91-zoneMU91_0N-2",
                isSelected: false
              },
              {
                value: 'T.R1',
                className: "MU91-zoneMU91_0N-3",
                isSelected: false
              },
              {
                value: 'S.07',
                className: "MU91-zoneMU91_0N-4",
                isSelected: false
              },
              {
                value: 'S.02',
                className: "MU91-zoneMU91_0N-5",
                isSelected: false
              },
              {
                value: 'S.05',
                className: "MU91-zoneMU91_0N-6",
                isSelected: false
              },
              {
                value: 'S.04',
                className: "MU91-zoneMU91_0N-7",
                isSelected: false
              },
              {
                value: 'S.03',
                className: "MU91-zoneMU91_0N-8",
                isSelected: false
              },
              {
                value: 'S.01',
                className: "MU91-zoneMU91_0N-9",
                isSelected: false
              },
              {
                value: 'MU91.0O',
                className: "MU91-zoneMU91_0O-1",
                isSelected: false
              },
              {
                value: 'MU91.0P',
                className: "MU91-zoneMU91_0P-1",
                isSelected: false
              },
              {
                value: 'MU91.0Q',
                className: "MU91-zoneMU91_0Q-1",
                isSelected: false
              },
              {
                value: 'MU91.0R',
                className: "MU91-zoneMU91_0R-1",
                isSelected: false
              },
              {
                value: 'MU91.0S',
                className: "MU91-zoneMU91_0S-1",
                isSelected: false
              }
            ]
          },
        ]
      },

      {
        planType: "MU91.1",
        zoneList: [
          {
            floorName: 'FirstFloor',
            zoneSubList: [
              {
                value: 'MU91.1A',
                className: "MU91-zoneMU91_1A-1",
                isSelected: false
              },
              {
                value: 'MU91.1F',
                className: "MU91-zoneMU91_1F-1",
                isSelected: false
              },
              {
                value: 'S.10',
                className: "MU91-zoneMU91_1G-1",
                isSelected: false
              },
              {
                value: '1.01',
                className: "MU91-zoneMU91_1H-1",
                isSelected: false
              },
              {
                value: 'MU91.1M',
                className: "MU91-zoneMU91_1M-1",
                isSelected: false
              },
              {
                value: 'S.10',
                className: "MU91-zoneMU91_1N-1",
                isSelected: false
              },
              {
                value: '1.11.1',
                className: "MU91-zoneMU91_1N-2",
                isSelected: false
              },
              {
                value: '1.11',
                className: "MU91-zoneMU91_1N-3",
                isSelected: false
              },
              {
                value: 'TR1',
                className: "MU91-zoneMU91_1N-4",
                isSelected: false
              },
              {
                value: '1.09',
                className: "MU91-zoneMU91_1N-5",
                isSelected: false
              },
              {
                value: '1.09.1',
                className: "MU91-zoneMU91_1N-6",
                isSelected: false
              },
              {
                value: 'S.02',
                className: "MU91-zoneMU91_1N-7",
                isSelected: false
              },
              {
                value: '1.03',
                className: "MU91-zoneMU91_1N-8",
                isSelected: false
              },
              {
                value: 'S.01',
                className: "MU91-zoneMU91_1N-9",
                isSelected: false
              },
              {
                value: 'MU91.1P',
                className: "MU91-zoneMU91_1P-1",
                isSelected: false
              }

            ]
          },
        ]
      },

      {
        planType: "MU91.2",
        zoneList: [
          {
            floorName: 'SecondFloor',
            zoneSubList: [
              {
                value: 'MU91.2F',
                className: "MU91-zoneMU91_2F-1",
                isSelected: false
              }
            ]
          },
        ]
      },
      {
        planType: "MU91.3",
        zoneList: [
          {
            floorName: 'ThirdFloor',
            zoneSubList: [
              {
                value: 'MU91.3F',
                className: "MU91-zoneMU91_3F-1",
                isSelected: false
              }
            ]
          },
        ]
      },
      {
        planType: "MU91.4",
        zoneList: [
          {
            floorName: 'FourthFloor',
            zoneSubList: [
              {
                value: 'MU91.4F',
                className: "MU91-zoneMU91_4F-1",
                isSelected: false
              }
            ]
          },
        ]
      },
      {
        planType: "MU91.R",
        zoneList: [
          {
            floorName: 'Roof',
            zoneSubList: [
              {
                value: '91.RE',
                className: "MU91_RE_1",
                isSelected: false
              },
              {
                value: '91.RG',
                className: "MU91_RG_1",
                isSelected: false
              },
              {
                value: '91.RR',
                className: "MU91_RR_1",
                isSelected: false
              },
              {
                value: '91.RH',
                className: "MU91_RH_1",
                isSelected: false
              },
              {
                value: '91.RL',
                className: "MU91_RL_1",
                isSelected: false
              },
              {
                value: '91.RK',
                className: "MU91_RK_1",
                isSelected: false
              },
              {
                value: '91.RS',
                className: "MU91_RS_1",
                isSelected: false
              },
              {
                value: '91.RN',
                className: "MU91_RN_1",
                isSelected: false
              },
              {
                value: '91.RO',
                className: "MU91_RO_1",
                isSelected: false
              }

            ]
          },
        ]
      },

      // ends MU 91 section
    ]
    return this.bulidingFloorData;
  }

  public GetAllSites(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/sites.php');
  }
  public GetAllBuildingsbyid(siteid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/buildings.php?siteid=' + siteid);
  }
  public GetAllFloorsbyid(bid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/floors.php?bid=' + bid);
  }
  public GetAllRoomsbyid(flid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/rooms.php?flid=' + flid);
  }

  public GetAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'request/read.php');
  }
  public GetAllRequestsByid(res: RequestBySubcontractorId): Observable<any[]> {
    return this.http.post<any[]>(environment.API_URL + 'request/readrequestid.php', res);
  }

  public GetRequestsImagesByid(id): Observable<any[]> {
    return this.http.get<any>(environment.API_URL + 'request/readImageslist.php?requestId=' + id);
  }

  public GetRequestsLogs(id: RequestsbyId): Observable<any[]> {
    return this.http.post<any>(environment.API_URL + 'request/readLogs.php', id);
  }

  public CreateNewRequest(req): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/create.php', req);
  }
  public UpdateRequest(req: EditRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update.php', req);
  }
  public UpdateListStatusRequest(req: UpdateRequestStatusListDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update_status.php', req);
  }
  public DeleteRequest(req: DeleteRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/delete.php', req);
  }
  public GetPlans(req: PlansDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/planslist.php', req);
  }
  public CopyRequest(req: CopyRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/createbycount.php', req);
  }

  public SearchRequest(req: SearchRequestDto): Observable<any> {
    // req: readrequestinfo
    return this.http.post<any>(environment.API_URL + 'request/searchlist.php', req);
  }

  public CloseRequest(formData): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/upload.php', formData);
  }


  public UpdateListReqstNote(req: UpdateNotes): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/updateNotes.php', req);
  }
  public UpdateListReqstSafety(req: UpdateSafety): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/updateSafety.php', req);
  }
  public UpdateListReqstTime(req: UpdateTime): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/updateStartTime.php', req);
  }

  // pagination
  public listpagination(data): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/readrequestinfo.php', data);
  }

  public addCategory(data): Observable<any> {
    return this.http.post<any>(environment.API_URL + "category/create.php", data);
  }

  public readCategory(): Observable<any> {
    return this.http.get(environment.API_URL + "category/read.php");
  }

  public deleteActivity(data): Observable<any> {
    return this.http.post(environment.API_URL + "category/delete.php", data);
  }



  // public SetselectedRequest(row)
  // {
  //   this.SelectedRequestData=row;
  // }
  // public GetSelectedRequestData():Observable<any[]> {
  //   return this.SelectedRequestData;
  // }
}
