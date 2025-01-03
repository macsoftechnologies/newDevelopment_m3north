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
      

        ]
      },
      // ends external area

      // starts ma purification section
      {
        planType: "Ground Floor",
        zoneList: [
          {
            floorName: '10.GF.Backage',
            zoneSubList: [
              {
                value: 'S.106',
                className: "MA-zone10_GF_Backage-1",
                isSelected: false
              },
            ]
          },
          {
            floorName: '10.GF.Corridor.N',
            zoneSubList: [
              {
                value: 'S.100',
                className: "MA-zone10_GF_Corridor_N-1",
                isSelected: false
              },
            ]
          },
          {
            floorName: '10.GF.Corridor.S',
            zoneSubList: [
              {
                value: 'S.170',
                className: "MA-zone10_GF_Corridor_S-1",
                isSelected: false
              },
            ]
          },
          {
            floorName: '10.GF.Frontstage.E',
            zoneSubList: [
              {
                value: 'S.103',
                className: "MA-zone10_GF_Frontstage_E-1",
                isSelected: false
              },
              {
                value: 'S.101',
                className: "MA-zone10_GF_Frontstage_E-2",
                isSelected: false
              },

            ]
          },
          {
            floorName: '10.GF.Frontstage.W',
            zoneSubList: [
              {
                value: 'S.102',
                className: "MA-zone10_GF_Frontstage_W-1",
                isSelected: false
              },
              {
                value: 'S.104',
                className: "MA-zone10_GF_Frontstage_W-2",
                isSelected: false
              },
            ]
          },
          {
            floorName: '11.0',
            zoneSubList: [
              {
                value: 'S.132',
                className: "MA-zone11_0-1",
                isSelected: false
              },
              {
                value: 'S.136',
                className: "MA-zone11_0-2",
                isSelected: false
              },
              {
                value: 'S.144',
                className: "MA-zone11_0-3",
                isSelected: false
              },
              {
                value: 'S.146',
                className: "MA-zone11_0-4",
                isSelected: false
              },
              {
                value: 'S.146.2',
                className: "MA-zone11_0-5",
                isSelected: false
              },
              {
                value: 'S.146.1',
                className: "MA-zone11_0-6",
                isSelected: false
              },
              {
                value: 'S.148.3',
                className: "MA-zone11_0-7",
                isSelected: false
              },
              {
                value: 'S.148.2',
                className: "MA-zone11_0-8",
                isSelected: false
              },
              {
                value: 'S.148.1',
                className: "MA-zone11_0-9",
                isSelected: false
              },
              {
                value: 'S.150',
                className: "MA-zone11_0-10",
                isSelected: false
              },
              {
                value: 'S.148',
                className: "MA-zone11_0-11",
                isSelected: false
              },
              {
                value: 'S.152',
                className: "MA-zone11_0-12",
                isSelected: false
              },
              {
                value: 'S.148.4',
                className: "MA-zone11_0-13",
                isSelected: false
              },
              {
                value: 'S.154',
                className: "MA-zone11_0-14",
                isSelected: false
              },

            ]
          },
          {
            floorName: '70.0A',
            zoneSubList: [
              {
                value: 'TR73',
                className: "MA-zone70_0A-1",
                isSelected: false
              },
              {
                value: 'LI73',
                className: "MA-zone70_0A-2",
                isSelected: false
              },
              {
                value: 'S.738',
                className: "MA-zone70_0A-3",
                isSelected: false
              },
              {
                value: 'SK73',
                className: "MA-zone70_0A-4",
                isSelected: false
              },
              {
                value: 'S.734',
                className: "MA-zone70_0A-5",
                isSelected: false
              },
              {
                value: 'S.732',
                className: "MA-zone70_0A-6",
                isSelected: false
              },
              {
                value: 'S.730',
                className: "MA-zone70_0A-7",
                isSelected: false
              },
              {
                value: 'S.728',
                className: "MA-zone70_0A-8",
                isSelected: false
              },
              {
                value: 'S.726',
                className: "MA-zone70_0A-9",
                isSelected: false
              },
              {
                value: 'S.726.1',
                className: "MA-zone70_0A-10",
                isSelected: false
              },
              {
                value: 'S.726.2',
                className: "MA-zone70_0A-11",
                isSelected: false
              },
              {
                value: 'S.724',
                className: "MA-zone70_0A-12",
                isSelected: false
              },
              {
                value: 'S.716',
                className: "MA-zone70_0A-13",
                isSelected: false
              },
              {
                value: 'S.722',
                className: "MA-zone70_0A-14",
                isSelected: false
              },
              {
                value: 'S.720',
                className: "MA-zone70_0A-15",
                isSelected: false
              },
              {
                value: 'S.716.1',
                className: "MA-zone70_0A-16",
                isSelected: false
              },
              {
                value: 'S.716.2',
                className: "MA-zone70_0A-17",
                isSelected: false
              },

            ]
          },
          {
            floorName: '70.0B',
            zoneSubList: [
              {
                value: 'TR72',
                className: "MA-zone70_0B-1",
                isSelected: false
              },
              {
                value: 'S.723',
                className: "MA-zone70_0B-2",
                isSelected: false
              },
              {
                value: 'S.719',
                className: "MA-zone70_0B-3",
                isSelected: false
              },
              {
                value: 'S.715',
                className: "MA-zone70_0B-4",
                isSelected: false
              },
              {
                value: 'S.717',
                className: "MA-zone70_0B-5",
                isSelected: false
              },
              {
                value: 'S.717.1',
                className: "MA-zone70_0B-6",
                isSelected: false
              },
              {
                value: 'S.717.2',
                className: "MA-zone70_0B-7",
                isSelected: false
              },
              {
                value: 'S.713',
                className: "MA-zone70_0B-8",
                isSelected: false
              },
              {
                value: 'S.711',
                className: "MA-zone70_0B-9",
                isSelected: false
              },
              {
                value: 'S.709',
                className: "MA-zone70_0B-10",
                isSelected: false
              },
              {
                value: 'S.707',
                className: "MA-zone70_0B-11",
                isSelected: false
              },
              {
                value: 'S.705',
                className: "MA-zone70_0B-12",
                isSelected: false
              },
              {
                value: 'S.703',
                className: "MA-zone70_0B-13",
                isSelected: false
              },
              {
                value: 'S.703.1',
                className: "MA-zone70_0B-14",
                isSelected: false
              },
              {
                value: 'S.701',
                className: "MA-zone70_0B-15",
                isSelected: false
              },
              {
                value: 'LI71',
                className: "MA-zone70_0B-16",
                isSelected: false
              },
              {
                value: 'TR71',
                className: "MA-zone70_0B-17",
                isSelected: false
              },
            ]
          },
          {
            floorName: '40.0A',
            zoneSubList: [
              {
                value: 'S.416',
                className: "MA-zone40_0A-1",
                isSelected: false
              },
              {
                value: 'S.412.1',
                className: "MA-zone40_0A-2",
                isSelected: false
              },
              {
                value: 'S.418',
                className: "MA-zone40_0A-3",
                isSelected: false
              },
              {
                value: 'S.412',
                className: "MA-zone40_0A-4",
                isSelected: false
              },
              {
                value: 'S.418.1',
                className: "MA-zone40_0A-5",
                isSelected: false
              },
              {
                value: 'S.412.2',
                className: "MA-zone40_0A-6",
                isSelected: false
              },
              {
                value: 'S.420',
                className: "MA-zone40_0A-7",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0C',
            zoneSubList: [
              {
                value: 'TR41',
                className: "MA-zone40_0C-1",
                isSelected: false
              },
              {
                value: 'LI41',
                className: "MA-zone40_0C-2",
                isSelected: false
              },
              {
                value: 'S.400',
                className: "MA-zone40_0C-3",
                isSelected: false
              },
              {
                value: 'S.428',
                className: "MA-zone40_0C-4",
                isSelected: false
              },
              {
                value: 'S.514',
                className: "MA-zone40_0C-5",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0D',
            zoneSubList: [
              {
                value: 'S.424',
                className: "MA-zone40_0D-1",
                isSelected: false
              },
              {
                value: 'S.426',
                className: "MA-zone40_0D-2",
                isSelected: false
              },
              {
                value: 'S.426.3',
                className: "MA-zone40_0D-3",
                isSelected: false
              },
              {
                value: 'S.426.2',
                className: "MA-zone40_0D-4",
                isSelected: false
              },
              {
                value: 'S.426.1',
                className: "MA-zone40_0D-5",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0E',
            zoneSubList: [
              {
                value: 'S.432',
                className: "MA-zone40_0E-1",
                isSelected: false
              },
              {
                value: 'S.434',
                className: "MA-zone40_0E-2",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0F',
            zoneSubList: [
              {
                value: 'S.430.1',
                className: "MA-zone40_0F-1",
                isSelected: false
              },
              {
                value: 'S.430.2',
                className: "MA-zone40_0F-2",
                isSelected: false
              },
              {
                value: 'S.436',
                className: "MA-zone40_0F-3",
                isSelected: false
              },
              {
                value: 'S.430',
                className: "MA-zone40_0F-4",
                isSelected: false
              },
              {
                value: 'S.430.4',
                className: "MA-zone40_0F-5",
                isSelected: false
              },
              {
                value: 'S.430.3',
                className: "MA-zone40_0F-6",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0G',
            zoneSubList: [
              {
                value: 'S.446',
                className: "MA-zone40_0G-1",
                isSelected: false
              },
              {
                value: 'S.446',
                className: "MA-zone40_0G-2",
                isSelected: false
              },
              {
                value: 'TR43',
                className: "MA-zone40_0G-3",
                isSelected: false
              },
              {
                value: 'S.448',
                className: "MA-zone40_0G-4",
                isSelected: false
              },


            ]
          },
          {
            floorName: '40.0J',
            zoneSubList: [
              {
                value: 'S.450',
                className: "MA-zone40_0J-1",
                isSelected: false
              },
              {
                value: 'S.450.1',
                className: "MA-zone40_0J-2",
                isSelected: false
              },
              {
                value: 'S.450.2',
                className: "MA-zone40_0J-3",
                isSelected: false
              },
              {
                value: 'S.450.3',
                className: "MA-zone40_0J-4",
                isSelected: false
              },
              {
                value: 'S.450.4',
                className: "MA-zone40_0J-5",
                isSelected: false
              },
              {
                value: 'S.502',
                className: "MA-zone40_0J-6",
                isSelected: false
              },
              {
                value: 'S.502.1',
                className: "MA-zone40_0J-7",
                isSelected: false
              },
              {
                value: 'S.506',
                className: "MA-zone40_0J-8",
                isSelected: false
              },
              {
                value: 'S.506.1',
                className: "MA-zone40_0J-9",
                isSelected: false
              },
              {
                value: 'S.506.2',
                className: "MA-zone40_0J-10",
                isSelected: false
              },
              {
                value: 'S.446.1',
                className: "MA-zone40_0J-11",
                isSelected: false
              },
              {
                value: 'S.504',
                className: "MA-zone40_0J-12",
                isSelected: false
              },
              {
                value: 'S.508',
                className: "MA-zone40_0J-13",
                isSelected: false
              },
              {
                value: 'S.510',
                className: "MA-zone40_0J-14",
                isSelected: false
              },


            ]
          },
          {
            floorName: '40.0K',
            zoneSubList: [
              {
                value: 'S.440',
                className: "MA-zone40_0K-1",
                isSelected: false
              },
              {
                value: 'S.444',
                className: "MA-zone40_0K-2",
                isSelected: false
              },
              {
                value: 'S.438',
                className: "MA-zone40_0K-3",
                isSelected: false
              },
              {
                value: 'S.442',
                className: "MA-zone40_0K-4",
                isSelected: false
              },
              {
                value: 'S.442.1',
                className: "MA-zone40_0K-5",
                isSelected: false
              },
              {
                value: 'S.444.1',
                className: "MA-zone40_0K-6",
                isSelected: false
              },
              {
                value: 'S.438.1',
                className: "MA-zone40_0K-7",
                isSelected: false
              },
              {
                value: 'S.438.3',
                className: "MA-zone40_0K-8",
                isSelected: false
              },
              {
                value: 'S.438.2',
                className: "MA-zone40_0K-9",
                isSelected: false
              },
              {
                value: 'S.442.2',
                className: "MA-zone40_0K-10",
                isSelected: false
              },
              {
                value: 'S.442.3',
                className: "MA-zone40_0K-11",
                isSelected: false
              },
              {
                value: 'S.438.4',
                className: "MA-zone40_0K-13",
                isSelected: false
              },
              {
                value: 'S.444.2',
                className: "MA-zone40_0K-14",
                isSelected: false
              },
              {
                value: 'TR42',
                className: "MA-zone40_0K-15",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0L',
            zoneSubList: [
              {
                value: 'S.402',
                className: "MA-zone40_0L-1",
                isSelected: false
              },
              {
                value: 'S.402.1',
                className: "MA-zone40_0L-2",
                isSelected: false
              },
              {
                value: 'S.404',
                className: "MA-zone40_0L-3",
                isSelected: false
              },
              {
                value: 'S.410',
                className: "MA-zone40_0L-4",
                isSelected: false
              },
              {
                value: 'S.410.1',
                className: "MA-zone40_0L-5",
                isSelected: false
              },
              {
                value: 'S.406',
                className: "MA-zone40_0L-6",
                isSelected: false
              },
              {
                value: 'S.406.2',
                className: "MA-zone40_0L-7",
                isSelected: false
              },
              {
                value: 'S.406.1',
                className: "MA-zone40_0L-8",
                isSelected: false
              },
            ]
          },
          {
            floorName: '40.0M',
            zoneSubList: [
              {
                value: 'S.405',
                className: "MA-zone40_0M-1",
                isSelected: false
              },
              {
                value: 'S.407',
                className: "MA-zone40_0M-2",
                isSelected: false
              },
              {
                value: 'S.409',
                className: "MA-zone40_0M-3",
                isSelected: false
              },
              {
                value: 'S.403',
                className: "MA-zone40_0M-4",
                isSelected: false
              },
              {
                value: 'S.403.2',
                className: "MA-zone40_0M-5",
                isSelected: false
              },
              {
                value: 'S.409.1',
                className: "MA-zone40_0M-6",
                isSelected: false
              },
              {
                value: 'S.409.1.1',
                className: "MA-zone40_0M-7",
                isSelected: false
              },
              {
                value: 'S.409.2',
                className: "MA-zone40_0M-8",
                isSelected: false
              },
              {
                value: 'S.409.3',
                className: "MA-zone40_0M-9",
                isSelected: false
              },
              {
                value: 'S.409.4',
                className: "MA-zone40_0M-10",
                isSelected: false
              },
              {
                value: 'S.401.1',
                className: "MA-zone40_0M-11",
                isSelected: false
              },
              {
                value: 'S.401',
                className: "MA-zone40_0M-12",
                isSelected: false
              },
              {
                value: 'S.403.1',
                className: "MA-zone40_0M-13",
                isSelected: false
              },
              {
                value: 'LI44',
                className: "MA-zone40_0M-14",
                isSelected: false
              },
              {
                value: 'S.400.1',
                className: "MA-zone40_0M-15",
                isSelected: false
              },
              {
                value: 'S.411',
                className: "MA-zone40_0M-16",
                isSelected: false
              },
              {
                value: 'S.411.1',
                className: "MA-zone40_0M-17",
                isSelected: false
              },
              {
                value: 'S.411.2',
                className: "MA-zone40_0M-18",
                isSelected: false
              },
              {
                value: 'S.411.3',
                className: "MA-zone40_0M-19",
                isSelected: false
              },
              {
                value: 'S.413',
                className: "MA-zone40_0M-20",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0Q',
            zoneSubList: [
              {
                value: 'S.419',
                className: "MA-zone40_0Q-1",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0R',
            zoneSubList: [
              {
                value: 'S.425',
                className: "MA-zone40_0R-1",
                isSelected: false
              },
              {
                value: 'S.429.1',
                className: "MA-zone40_0R-2",
                isSelected: false
              },
              {
                value: 'S.421.1',
                className: "MA-zone40_0R-3",
                isSelected: false
              },
              {
                value: 'S.421',
                className: "MA-zone40_0R-4",
                isSelected: false
              },
              {
                value: 'S.423',
                className: "MA-zone40_0R-5",
                isSelected: false
              },
              {
                value: 'S.423.1',
                className: "MA-zone40_0R-6",
                isSelected: false
              },
              {
                value: 'S.427',
                className: "MA-zone40_0R-7",
                isSelected: false
              },
              {
                value: 'S.427.1',
                className: "MA-zone40_0R-8",
                isSelected: false
              },
              {
                value: 'S.427.2',
                className: "MA-zone40_0R-9",
                isSelected: false
              },
              {
                value: 'S.427.3',
                className: "MA-zone40_0R-10",
                isSelected: false
              },
            ]
          },
          {
            floorName: '40.0S',
            zoneSubList: [
              {
                value: 'S.429',
                className: "MA-zone40_0S-1",
                isSelected: false
              },

            ]
          },
          {
            floorName: '40.0U',
            zoneSubList: [
              {
                value: 'S.441',
                className: "MA-zone40_0U-1",
                isSelected: false
              },

            ]
          },
        ]
      },

      {
        planType: "First Floor",
        zoneList: [
          {
            floorName: '10.1F.Backstage',
            zoneSubList: [
              {
                value: '10.1F.Backstage',
                className: "MA-zone10_1F_Backstage-1",
                isSelected: false
              }
            ]
          },
          {
            floorName: '10.1F.CorridorN',
            zoneSubList: [
              {
                value: '1.102',
                className: "MA-zone10_1F_Corridor-N-1",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '10.1F.FrontstageE',
            zoneSubList: [
              {
                value: '1.101',
                className: "MA-zone10_1F_Frontstage-E-1",
                isSelected: false
              },
              {
                value: '1.107',
                className: "MA-zone10_1F_Frontstage-E-2",
                isSelected: false
              },
              {
                value: 'S.103',
                className: "MA-zone10_1F_Frontstage-E-3",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '10.1F.FrontstageW',
            zoneSubList: [
              {
                value: 'S.104',
                className: "MA-zone10_1F_Frontstage-W-1",
                isSelected: false
              }
            ]
          },
          {
            floorName: '10.1F.IT',
            zoneSubList: [
              {
                value: '1.151',
                className: "MA-zone10_1F_IT-1",
                isSelected: false
              },
              {
                value: '1.153',
                className: "MA-zone10_1F_IT-2",
                isSelected: false
              }
            ]
          },
          {
            floorName: '70.1A',
            zoneSubList: [
              {
                value: 'TR73',
                className: "MA-zone70_1A-1",
                isSelected: false
              },
              {
                value: 'LI73',
                className: "MA-zone70_1A-2",
                isSelected: false
              },
              {
                value: '1.738',
                className: "MA-zone70_1A-3",
                isSelected: false
              },
              {
                value: '1.736',
                className: "MA-zone70_1A-4",
                isSelected: false
              },
              {
                value: '1.732.1',
                className: "MA-zone70_1A-5",
                isSelected: false
              },
              {
                value: '1.734',
                className: "MA-zone70_1A-6",
                isSelected: false
              },
              {
                value: '1.732',
                className: "MA-zone70_1A-7",
                isSelected: false
              },
              {
                value: '1.730',
                className: "MA-zone70_1A-8",
                isSelected: false
              },
              {
                value: 'TR72',
                className: "MA-zone70_1A-9",
                isSelected: false
              },
              {
                value: '1.729',
                className: "MA-zone70_1A-10",
                isSelected: false
              },
              {
                value: '1.716',
                className: "MA-zone70_1A-11",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '70.1B',
            zoneSubList: [
              {
                value: '1.727',
                className: "MA-zone70_1B-1",
                isSelected: false
              },
              {
                value: '1.725',
                className: "MA-zone70_1B-2",
                isSelected: false
              },
              {
                value: '1.725.1',
                className: "MA-zone70_1B-3",
                isSelected: false
              },
              {
                value: '1.723',
                className: "MA-zone70_1B-4",
                isSelected: false
              },
              {
                value: '1.711.2',
                className: "MA-zone70_1B-5",
                isSelected: false
              },
              {
                value: 'SK72',
                className: "MA-zone70_1B-6",
                isSelected: false
              },
              {
                value: '1.721',
                className: "MA-zone70_1B-7",
                isSelected: false
              },
              {
                value: '1.719',
                className: "MA-zone70_1B-8",
                isSelected: false
              },
              {
                value: '1.717',
                className: "MA-zone70_1B-9",
                isSelected: false
              },
              {
                value: '1.711',
                className: "MA-zone70_1B-10",
                isSelected: false
              },
              {
                value: '1.715',
                className: "MA-zone70_1B-11",
                isSelected: false
              },
              {
                value: '1.713',
                className: "MA-zone70_1B-12",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '70.1C',
            zoneSubList: [
              {
                value: '1.711.1',
                className: "MA-zone70_1C-1",
                isSelected: false
              },
              {
                value: '1.705.2',
                className: "MA-zone70_1C-2",
                isSelected: false
              },
              {
                value: '1.705.1',
                className: "MA-zone70_1C-3",
                isSelected: false
              },
              {
                value: '1.709',
                className: "MA-zone70_1C-4",
                isSelected: false
              },
              {
                value: '1.707',
                className: "MA-zone70_1C-5",
                isSelected: false
              },
              {
                value: '1.707.2',
                className: "MA-zone70_1C-6",
                isSelected: false
              },
              {
                value: '1.707.1',
                className: "MA-zone70_1C-7",
                isSelected: false
              },
              {
                value: '1.705',
                className: "MA-zone70_1C-8",
                isSelected: false
              },
              {
                value: '1.703',
                className: "MA-zone70_1C-9",
                isSelected: false
              },
              {
                value: 'LI71',
                className: "MA-zone70_1C-10",
                isSelected: false
              },
              {
                value: '1.701',
                className: "MA-zone70_1C-11",
                isSelected: false
              },
              {
                value: 'TR71',
                className: "MA-zone70_1C-12",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '40.1A',
            zoneSubList: [
              {
                value: '1.418',
                className: "MA-zone40_1A-1",
                isSelected: false
              },
              {
                value: '1.422.1',
                className: "MA-zone40_1A-2",
                isSelected: false
              },
              {
                value: '1.422.2',
                className: "MA-zone40_1A-3",
                isSelected: false
              },
              {
                value: '1.422.3',
                className: "MA-zone40_1A-4",
                isSelected: false
              },
              {
                value: '1.422.4',
                className: "MA-zone40_1A-5",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '40.1B',
            zoneSubList: [
              {
                value: '1.404',
                className: "MA-zone40_1B-1",
                isSelected: false
              },
              {
                value: '1.404.1',
                className: "MA-zone40_1B-2",
                isSelected: false
              }
            ]
          },
          {
            floorName: '40.1C',
            zoneSubList: [
              {
                value: '1.400',
                className: "MA-zone40_1C-1",
                isSelected: false
              },
              {
                value: 'TR41',
                className: "MA-zone40_1C-2",
                isSelected: false
              },
              {
                value: 'LI41',
                className: "MA-zone40_1C-3",
                isSelected: false
              },
              {
                value: '1.121',
                className: "MA-zone40_1C-4",
                isSelected: false
              },
              {
                value: '1.422',
                className: "MA-zone40_1C-5",
                isSelected: false
              },
              {
                value: '1.100',
                className: "MA-zone40_1C-6",
                isSelected: false
              },
              {
                value: 'SK42.1',
                className: "MA-zone40_1C-7",
                isSelected: false
              },
              {
                value: 'SK42',
                className: "MA-zone40_1C-8",
                isSelected: false
              },
              {
                value: '1.428',
                className: "MA-zone40_1C-9",
                isSelected: false
              }
      
      
            ]
          },
          {
            floorName: '40.1D',
            zoneSubList: [
              {
                value: '1.427',
                className: "MA-zone40_1D-1",
                isSelected: false
              },
              {
                value: '1.425',
                className: "MA-zone40_1D-2",
                isSelected: false
              },
              {
                value: '1.423',
                className: "MA-zone40_1D-3",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '40.1E',
            zoneSubList: [
              {
                value: '1.434',
                className: "MA-zone40_1E-1",
                isSelected: false
              }
      
            ]
          },
          {
            floorName: '40.1F',
            zoneSubList: [
              {
                value: '1.430',
                className: "MA-zone40_1F-1",
                isSelected: false
                },
                {
                value: '1.430.1',
                className: "MA-zone40_1F-2",
                isSelected: false
                }
            ]
          },
          {
            floorName: '40.1G',
            zoneSubList: [
              {
                value: '1.446',
                className: "MA-zone40_1G-1",
                isSelected: false
                },
                {
                value: 'TR43',
                className: "MA-zone40_1G-2",
                isSelected: false
                },
                {
                value: '1.448',
                className: "MA-zone40_1G-3",
                isSelected: false
                }
            ]
          },
          {
            floorName: '40.1I',
            zoneSubList: [
              {
                value: '1.506',
                className: "MA-zone40_1I-1",
                isSelected: false
                },
                {
                value: '1.504.2',
                className: "MA-zone40_1I-2",
                isSelected: false
                },
                {
                value: '1.504.1',
                className: "MA-zone40_1I-3",
                isSelected: false
                },
                {
                value: '1.504',
                className: "MA-zone40_1I-4",
                isSelected: false
                },
                {
                value: '1.510',
                className: "MA-zone40_1I-5",
                isSelected: false
                },
                {
                value: '1.508',
                className: "MA-zone40_1G-6",
                isSelected: false
                }
              
            ]
          },
          {
            floorName: '40.1J',
            zoneSubList: [
              {
                value: 'SK43',
                className: "MA-zone40_1J-1",
                isSelected: false
                },
                {
                value: '1.502',
                className: "MA-zone40_1J-2",
                isSelected: false
                }
             
            ]
          },
          {
            floorName: '40.1K',
            zoneSubList: [
              {
                value: '1.440',
                className: "MA-zone40_1K-1",
                isSelected: false
                },
                {
                value: '1.444',
                className: "MA-zone40_1K-2",
                isSelected: false
                },
                {
                value: '1.438',
                className: "MA-zone40_1K-3",
                isSelected: false
                },
                {
                value: '1.442',
                className: "MA-zone40_1K-4",
                isSelected: false
                },
                {
                value: '1.442.1',
                className: "MA-zone40_1K-5",
                isSelected: false
                },
                {
                value: '1.444.1',
                className: "MA-zone40_1K-6",
                isSelected: false
                },
                {
                value: '1.438.1',
                className: "MA-zone40_1K-7",
                isSelected: false
                },
                {
                value: 'TR42',
                className: "MA-zone40_1K-8",
                isSelected: false
                },
                {
                value: '1.438.2',
                className: "MA-zone40_1K-9",
                isSelected: false
                },
                {
                value: '1.442.2',
                className: "MA-zone40_1K-10",
                isSelected: false
                },
                {
                value: '1.442.3',
                className: "MA-zone40_1K-11",
                isSelected: false
                },
                {
                value: '1.438.4',
                className: "MA-zone40_1K-12",
                isSelected: false
                },
                {
                value: '1.442.4',
                className: "MA-zone40_1K-13",
                isSelected: false
                },
                {
                value: '1.444.2',
                className: "MA-zone40_1K-14",
                isSelected: false
                }
            ]
          },
          {
            floorName: '40.1L',
            zoneSubList: [
              {
                value: '1.408',
                className: "MA-zone40_1L-1",
                isSelected: false
                },
                {
                value: '1.402',
                className: "MA-zone40_1L-2",
                isSelected: false
                }
             
            ]
          },
          {
            floorName: '40.1M',
            zoneSubList: [
              {
                value: 'SK44',
                className: "MA-zone40_1M-1",
                isSelected: false
                },
                {
                value: 'SK44.1',
                className: "MA-zone40_1M-2",
                isSelected: false
                },
                {
                value: '1.405.1',
                className: "MA-zone40_1M-3",
                isSelected: false
                },
                {
                value: '1.405.2',
                className: "MA-zone40_1M-4",
                isSelected: false
                },
                {
                value: '1.405.3',
                className: "MA-zone40_1M-5",
                isSelected: false
                },
                {
                value: '1.405.4',
                className: "MA-zone40_1M-6",
                isSelected: false
                },
                {
                value: '1.407',
                className: "MA-zone40_1M-7",
                isSelected: false
                },
                {
                value: '1.405',
                className: "MA-zone40_1M-8",
                isSelected: false
                },
                {
                value: '1.405.5',
                className: "MA-zone40_1M-9",
                isSelected: false
                },
                {
                value: '1.403',
                className: "MA-zone40_1M-10",
                isSelected: false
                },
                {
                value: '1.401',
                className: "MA-zone40_1M-11",
                isSelected: false
                },
                {
                value: 'LI44',
                className: "MA-zone40_1M-12",
                isSelected: false
                },
                {
                value: '1.409.1',
                className: "MA-zone40_1M-13",
                isSelected: false
                },
                {
                value: '1.409.2',
                className: "MA-zone40_1M-14",
                isSelected: false
                },
                {
                value: '1.409.3',
                className: "MA-zone40_1M-15",
                isSelected: false
                },
                {
                value: '1.409',
                className: "MA-zone40_1M-16",
                isSelected: false
                },
                {
                value: '1.411',
                className: "MA-zone40_1M-17",
                isSelected: false
                }
              

            ]
          },
          
        ]
      },

      {
        planType: "Second Floor",
        zoneList: [
          {
            floorName: '10.2F.Backstage',
            zoneSubList: [
              {
                value: 'S.106',
                className: "MA-zone10_2F_Backstage-1",
                isSelected: false
              },
              {
                value: ' 2.156',
                className: "MA-zone10_2F_Backstage-2",
                isSelected: false
              }
            ]
          },
          {
            floorName: '10.2F.CorridorS',
            zoneSubList: [
              {
                value: ' 2.170',
                className: "MA-zone10_2F_Corridor-S-1",
                isSelected: false
              }

            ]
          },
          {
            floorName: '10.2F.Distribution',
            zoneSubList: [
              {
                value: ' 2.100',
                className: "MA-zone10_2F_Distribution-1",
                isSelected: false
              }
            ]
          },
          {
            floorName: '10.2F.FrontstageE',
            zoneSubList: [
              {
                value: ' 2.105',
                className: "MA-zone10_2F_Frontstage-E-1",
                isSelected: false
                },
                {
                value: ' 2.101',
                className: "MA-zone10_2F_Frontstage-E-2",
                isSelected: false
                },
                {
                value: ' 2.169',
                className: "MA-zone10_2F_Frontstage-E-3",
                isSelected: false
                }
                
            ]
          },
          {
            floorName: '10.2F.FrontstageW',
            zoneSubList: [
              {
                value: ' 2.108',
                className: "MA-zone10_2F_Frontstage-W-1",
                isSelected: false
                },
                {
                value: ' 2.102',
                className: "MA-zone10_2F_Frontstage-W-2",
                isSelected: false
                },
                {
                value: ' 2.168',
                className: "MA-zone10_2F_Frontstage-W-3",
                isSelected: false
                }
           
            ]
          },
          {
            floorName: '70.2A',
            zoneSubList: [
              {
                value: 'TR73',
                className: "MA-zone70_2A-1",
                isSelected: false
                },
                {
                value: 'LI73',
                className: "MA-zone70_2A-2",
                isSelected: false
                },
                {
                value: '2.738',
                className: "MA-zone70_2A-3",
                isSelected: false
                },
                {
                value: '2.736',
                className: "MA-zone70_2A-4",
                isSelected: false
                },
                {
                value: '2.732.2',
                className: "MA-zone70_2A-5",
                isSelected: false
                },
                {
                value: '2.734',
                className: "MA-zone70_2A-6",
                isSelected: false
                },
                {
                value: '2.732.1',
                className: "MA-zone70_2A-7",
                isSelected: false
                },
                {
                value: '2.732',
                className: "MA-zone70_2A-8",
                isSelected: false
                },
                {
                value: '2.730',
                className: "MA-zone70_2A-9",
                isSelected: false
                },
                {
                value: '2.728',
                className: "MA-zone70_2A-10",
                isSelected: false
                },
                {
                value: '2.731',
                className: "MA-zone70_2A-11",
                isSelected: false
                },
                {
                value: 'TR72',
                className: "MA-zone70_2A-12",
                isSelected: false
                },
                {
                value: '2.729',
                className: "MA-zone70_2A-13",
                isSelected: false
                },
                {
                value: '2.724',
                className: "MA-zone70_2A-14",
                isSelected: false
                },
                {
                value: '2.724.1',
                className: "MA-zone70_2A-15",
                isSelected: false
                },
                {
                value: '2.724.2',
                className: "MA-zone70_2A-16",
                isSelected: false
                },
                {
                value: '2.727',
                className: "MA-zone70_2A-17",
                isSelected: false
                },
                {
                value: '2.727.1',
                className: "MA-zone70_2A-18",
                isSelected: false
                },
                {
                value: '2.727.2',
                className: "MA-zone70_2A-19",
                isSelected: false
                },
                {
                value: '2.725',
                className: "MA-zone70_2A-20",
                isSelected: false
                },
                {
                value: '2.725.1',
                className: "MA-zone70_2A-21",
                isSelected: false
                },
                {
                value: '2.725.2',
                className: "MA-zone70_2A-22",
                isSelected: false
                },
                {
                value: '2.723',
                className: "MA-zone70_2A-23",
                isSelected: false
                },
                {
                value: '2.716',
                className: "MA-zone70_2A-24",
                isSelected: false
                },
              
            ]
          },
          {
            floorName: '70.2B',
            zoneSubList: [
              {
                value: '2.711',
                className: "MA-zone70_2B-1",
                isSelected: false
                },
                {
                value: '2.705',
                className: "MA-zone70_2B-2",
                isSelected: false
                },
                {
                value: '2.703',
                className: "MA-zone70_2B-3",
                isSelected: false
                },
                {
                value: 'LI71',
                className: "MA-zone70_2B-4",
                isSelected: false
                },
                {
                value: 'TR71',
                className: "MA-zone70_2B-5",
                isSelected: false
                },
            ]
          },
          {
            floorName: '40.2A.1',
            zoneSubList: [
              {
                value: ' 2.413',
                className: "MA-zone40_2A_1-1",
                isSelected: false
                },
                {
                value: ' 2.437',
                className: "MA-zone40_2A_1-2",
                isSelected: false
                },
                {
                value: ' 2.447',
                className: "MA-zone40_2A_1-3",
                isSelected: false
                },
                {
                value: ' 2.400',
                className: "MA-zone40_2A_1-4",
                isSelected: false
                },
             
            ]
          },
          {
            floorName: '40.2A.2',
            zoneSubList: [
              {
                value: ' 2.404',
                className: "MA-zone40_2A_2-1",
                isSelected: false
                },
              
            ]
          },
          {
            floorName: '40.2A.3',
            zoneSubList: [
              {
                value: ' 2.400',
                className: "MA-zone40_2A_3-1",
                isSelected: false
                },
                {
                value: ' 2.450',
                className: "MA-zone40_2A_3-2",
                isSelected: false
                },
           
            ]
          }, 
          {
            floorName: '40.2B',
            zoneSubList: [
              {
                value: 'TR41',
                className: "MA-zone40_2B-1",
                isSelected: false
                },
                {
                value: '2.416',
                className: "MA-zone40_2B-2",
                isSelected: false
                },
                {
                value: 'LI41',
                className: "MA-zone40_2B-3",
                isSelected: false
                },
              
            ]
          },
          {
            floorName: '40.2C',
            zoneSubList: [
              {
                value: '2.434.1',
                className: "MA-zone40_2C-1",
                isSelected: false
                },
                {
                value: '2.434.2',
                className: "MA-zone40_2C-2",
                isSelected: false
                },
                {
                value: '2.434',
                className: "MA-zone40_2C-3",
                isSelected: false
                },
              
            ]
          },
          {
            floorName: '40.2D',
            zoneSubList: [
              {
                value: '2.430.1',
                className: "MA-zone40_2D-1",
                isSelected: false
                },
                {
                value: 'SK42.1',
                className: "MA-zone40_2D-2",
                isSelected: false
                },
                {
                value: 'SK42',
                className: "MA-zone40_2D-3",
                isSelected: false
                },
                {
                value: '2.430',
                className: "MA-zone40_2D-4",
                isSelected: false
                },
                
             
            ]
          },
          {
            floorName: '40.2E',
            zoneSubList: [
              {
                value: '2.438.3',
                className: "MA-zone40_2E-1",
                isSelected: false
                },
                {
                value: '2.440',
                className: "MA-zone40_2E-2",
                isSelected: false
                },
                {
                value: '2.444',
                className: "MA-zone40_2E-3",
                isSelected: false
                },
                {
                value: '2.438',
                className: "MA-zone40_2E-4",
                isSelected: false
                },
                {
                value: '2.442',
                className: "MA-zone40_2E-5",
                isSelected: false
                },
                {
                value: '2.442.1',
                className: "MA-zone40_2E-6",
                isSelected: false
                },
                {
                value: '2.438.1',
                className: "MA-zone40_2E-7",
                isSelected: false
                },
                {
                value: '2.438.2',
                className: "MA-zone40_2E-8",
                isSelected: false
                },
                {
                value: '2.442.2',
                className: "MA-zone40_2E-9",
                isSelected: false
                },
                {
                value: '2.442.2',
                className: "MA-zone40_2E-10",
                isSelected: false
                },
                {
                value: 'TR42',
                className: "MA-zone40_2E-11",
                isSelected: false
                },
                {
                value: '2.442.3',
                className: "MA-zone40_2E-12",
                isSelected: false
                },
                {
                value: '2.438.4',
                className: "MA-zone40_2E-13",
                isSelected: false
                },
                {
                value: '2.442.2',
                className: "MA-zone40_2E-14",
                isSelected: false
                },
                {
                value: '2.444.2',
                className: "MA-zone40_2E-15",
                isSelected: false
                },
            
            ]
          },
          {
            floorName: '40.2F',
            zoneSubList: [
              {
                value: '2.403',
                className: "MA-zone40_2F-1",
                isSelected: false
                },
                {
                value: '2.402',
                className: "MA-zone40_2F-2",
                isSelected: false
                },
                {
                value: 'LI44',
                className: "MA-zone40_2F-3",
                isSelected: false
                },
                {
                value: '2.401',
                className: "MA-zone40_2F-4",
                isSelected: false
                },
             
            ]
          },
      
        ]
      },


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
