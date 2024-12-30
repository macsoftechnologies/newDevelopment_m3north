import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocumentProxy } from "ng2-pdf-viewer";

@Component({
  selector: 'app-request-building-model',
  templateUrl: './request-building-model.component.html',
  styleUrls: ['./request-building-model.component.css']
})
export class RequestBuildingModelComponent implements OnInit {
  floorBlock: Array<any> = [];
  selectedBlock: Array<any> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    let selectedBlockData = this.data.selectFloorBlocks.find(item => (item.planType == this.data.floor.planType) && (item.floorName == this.data.floor.name))
    console.log(selectedBlockData, "selectedBlockData")
    // external areas start
    if (this.data.floor.name == 'Area CT' && this.data.floor.planType == 'External Areas') {

      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "1")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'Area MA-I' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'Area MA-II' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [

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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'Area MA-III' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [

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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Area MB' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [

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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Area MU' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [

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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Area MT-MS' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [

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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Welfare' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'Roads' && this.data.floor.planType == 'External Areas') {
      this.floorBlock = [

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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    // external areas ends

    // start MU90 section
    else if (this.data.floor.name == 'MU90.0A' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
        {
          value: ' S.903',
          className: "MU90_GF-ZoneMU90_0A-1",
          isSelected: false
        }
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0B' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0C' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0D' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0E' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0F1' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0F2' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0I' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.0K' && this.data.floor.planType == 'MU90.0') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    // START MU90.1

    else if (this.data.floor.name == 'MU90.1BN' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
          className: "MU90_1_VB-ZoneMU90_1BN-1",
          isSelected: false
        },
        {
          value: '1.919.2',
          className: "MU90_1_VB-ZoneMU90_1BN-12",
          isSelected: false
        },
        {
          value: '1.919.1',
          className: "MU90_1_VB-ZoneMU90_1BN-13",
          isSelected: false
        },
        {
          value: '1.919.3',
          className: "MU90_1_VB-ZoneMU90_1BN-14",
          isSelected: false
        },
        {
          value: ' S.903',
          className: "MU90_1_VB-ZoneMU90_1BN-15",
          isSelected: false
        },
        {
          value: '1.919.4',
          className: "MU90_1_VB-ZoneMU90_1BN-16",
          isSelected: false
        }

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1BS' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1C' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
        {
          value: '1.937',
          className: "MU90_1_VB-ZoneMU90_1C-1",
          isSelected: false
        }

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1D' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
        {
          value: '1.947',
          className: "MU90_1_VB-ZoneMU90_1D-1",
          isSelected: false
        }

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1E' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
        {
          value: '1.951',
          className: "MU90_1_VB-ZoneMU90_1E-1",
          isSelected: false
        }
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1F' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
        {
          value: '1.952',
          className: "MU90_1_VB-ZoneMU90_1F-1",
          isSelected: false
        }
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1G' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1H' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1I' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1K' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'MU90.1L' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'MU90.1M' && this.data.floor.planType == 'MU90.1') {
      this.floorBlock = [
        {
          value: '1.922.1',
          className: "MU90_1_VB-ZoneMU90_1M-1",
          isSelected: false
        },
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'MU90.2' && this.data.floor.planType == 'MU90.2') {
      this.floorBlock = [
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }

    else if (this.data.floor.name == 'MU90.R' && this.data.floor.planType == 'MU90.R') {
      this.floorBlock = [
        {
          value: '90.RA',
          className: "MU90_1_VB-ZoneMU90_RA-1",
          isSelected: false
        },
        {
          value: '90.R.BW',
          className: "MU90_1_VB-ZoneMU90_R_RW-1",
          isSelected: false
        },
        {
          value: '90.R.BE',
          className: "MU90_1_VB-ZoneMU90_R_BE-1",
          isSelected: false
        }
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    // end MU90 section


    //start MU91 section
    else if (this.data.floor.name == 'GroundFloor' && this.data.floor.planType == 'MU91.0') {
      this.floorBlock = [

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
          className: "MU91-zoneMU91.0G-1",
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
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'FirstFloor' && this.data.floor.planType == 'MU91.1') {
      this.floorBlock = [

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
          className: "MU91-zoneMU91.1N-1",
          isSelected: false
        },
        {
          value: '1.11.1',
          className: "MU91-zoneMU91.1N-2",
          isSelected: false
        },
        {
          value: '1.11',
          className: "MU91-zoneMU91.1N-3",
          isSelected: false
        },
        {
          value: 'TR1',
          className: "MU91-zoneMU91.1N-4",
          isSelected: false
        },
        {
          value: '1.09',
          className: "MU91-zoneMU91.1N-5",
          isSelected: false
        },
        {
          value: '1.09.1',
          className: "MU91-zoneMU91.1N-6",
          isSelected: false
        },
        {
          value: 'S.02',
          className: "MU91-zoneMU91.1N-7",
          isSelected: false
        },
        {
          value: '1.03',
          className: "MU91-zoneMU91.1N-8",
          isSelected: false
        },
        {
          value: 'S.01',
          className: "MU91-zoneMU91.1N-8",
          isSelected: false
        },
        {
          value: 'MU91.1P',
          className: "MU91-zoneMU91.1P-1",
          isSelected: false
        }

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'SecondFloor' && this.data.floor.planType == 'MU91.2') {
      this.floorBlock = [
        {
          value: 'MU91.2F',
          className: "MU91-zoneMU91_2F-1",
          isSelected: false
        }
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'ThirdFloor' && this.data.floor.planType == 'MU91.3') {
      this.floorBlock = [
        {
          value: 'MU91.3F',
          className: "MU91-zoneMU91_3F-1",
          isSelected: false
        }
      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'FourthFloor' && this.data.floor.planType == 'MU91.4') {
      this.floorBlock = [
        {
          value: 'MU91.4F',
          className: "MU91-zoneMU91_4F-1",
          isSelected: false
        }

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }
    else if (this.data.floor.name == 'Roof' && this.data.floor.planType == 'MU91.R') {
      this.floorBlock = [
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
        },

      ]
      if (selectedBlockData) {
        if ((selectedBlockData.floorName == this.data.floor.name) && (selectedBlockData.planType == this.data.floor.planType)) {
          console.log(selectedBlockData, "2")
          this.floorBlock = selectedBlockData.selectedBlock;
        }
      }
    }


    //end MU91 section

    // console.log(this.data);
  }

  selectIndividualFloor(selectedBlock, event) {
    if (event) {
      this.selectedBlock.push(selectedBlock)

    } else {
      let index = this.selectedBlock.findIndex(item => item.value == selectedBlock.value)
      if (index > -1) {
        this.selectedBlock.splice(index, 1)
      }
    }
    console.log(this.selectedBlock, event, 'select')
  }

  // onSubmitSelectedBlock(){

  // }


}
