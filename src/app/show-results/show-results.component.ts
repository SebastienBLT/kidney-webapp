import { Component, OnInit } from '@angular/core';
// @ts-ignore
import results from '../../../../kidney/results.json';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent implements OnInit {

  public jsonResults ?= results;
  public selectedInstance: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.jsonResults)
  }

  // @ts-ignore
  changeInstance(e) {
    var idItemSelected = e.target.value;
    this.selectedInstance = this.jsonResults.results[idItemSelected];

    console.log(this.selectedInstance);

  }

  checkIsInSolution(itemId: any){
    for(let chain of this.selectedInstance.solution.chains)
    {
      //console.log(chain);
      //console.log(chain.sequence.find((item: { id: any; }) => item.id == itemId));
      if(chain.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined){
        return false;
      }
    }
    for(let cycle of this.selectedInstance.solution.cycles)
    {
      //console.log(cycle);
      if(cycle.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined){
        return false;
      }
    }
    return true;
  }



  getPourcentage(){
    let i=this.selectedInstance.instance.altruists.length+this.selectedInstance.instance.pairs.length;
    let itemId: any;
    for(let elt of this.selectedInstance.instance.altruists){
      itemId=elt.id;
      //console.log(i);
      for(let chain of this.selectedInstance.solution.chains)
      {
        //console.log(chain);
        //console.log(chain.sequence.find((item: { id: any; }) => item.id == itemId));
        if(chain.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined){
          i--;
        }
      }
      for(let cycle of this.selectedInstance.solution.cycles)
      {
        //console.log(cycle);
        if(cycle.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined){
          i--;
        }
      }

    }
    for(let elt of this.selectedInstance.instance.pairs){
      itemId=elt.id;
      for(let chain of this.selectedInstance.solution.chains)
      {
        //console.log(chain);
        //console.log(chain.sequence.find((item: { id: any; }) => item.id == itemId));
        if(chain.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined){
          i--;
        }
      }
      for(let cycle of this.selectedInstance.solution.cycles)
      {
        //console.log(cycle);
        if(cycle.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined){
          i--;
        }
      }

    }

    return Math.round(((i/(this.selectedInstance.instance.altruists.length+this.selectedInstance.instance.pairs.length))*100));
  }


  getTheBestLink(seqList :any){
    //console.log(sequence);
    let best=0;

    for(let seq of seqList){
      //console.log(seq);
      if(seq.coutVersleSuivant>best){
        best=seq.coutVersleSuivant;
      }
    }
    return best;
  }

  getTheWorstLink(seqList :any){
    //console.log(sequence);
    let best=100000000 ;

    for(let seq of seqList){
      //console.log(seq);
      if(seq.coutVersleSuivant<best){
        best=seq.coutVersleSuivant;
      }
    }
    return best;
  }
}
