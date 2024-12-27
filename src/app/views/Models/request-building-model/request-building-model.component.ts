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

    //

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
