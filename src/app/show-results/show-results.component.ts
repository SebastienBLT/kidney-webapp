import { Component, OnInit } from '@angular/core';
import results from '../../../../oop-opti-kidney-swap/results.json';

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

  changeInstance(e: any) {
    var idItemSelected = e.target.value;
    this.selectedInstance = this.jsonResults.results[idItemSelected];

    console.log(this.selectedInstance);
  }

  checkIsInSolution(itemId: any) {
    for(let chain of this.selectedInstance.solution.chains) {
      if(chain.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined) {
        return false;
      }
    }
    for(let cycle of this.selectedInstance.solution.cycles) {
      if(cycle.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined) {
        return false;
      }
    }
    return true;
  }

  getPourcentage() {
    let i=this.selectedInstance.instance.altruists.length+this.selectedInstance.instance.pairs.length;
    let itemId: any;
    for(let elt of this.selectedInstance.instance.altruists) {
      itemId = elt.id;
      for(let chain of this.selectedInstance.solution.chains) {
        if(chain.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined) {
          i--;
        }
      }
      for(let cycle of this.selectedInstance.solution.cycles) {
        if(cycle.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined) {
          i--;
        }
      }
    }
    for(let elt of this.selectedInstance.instance.pairs) {
      itemId=elt.id;
      for(let chain of this.selectedInstance.solution.chains) {
        if(chain.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined) {
          i--;
        }
      }
      for(let cycle of this.selectedInstance.solution.cycles) {
        if(cycle.sequence.find((item: { id: any; }) => item.id == itemId)!=undefined) {
          i--;
        }
      }
    }
    return Math.round(((i/(this.selectedInstance.instance.altruists.length+this.selectedInstance.instance.pairs.length))*100));
  }


  getTheBestLink(seqList :any){
    let best=0;
    for(let seq of seqList){
      if(seq.coutVersleSuivant>best){
        best=seq.coutVersleSuivant;
      }
    }
    return best;
  }

  getTheWorstLink(seqList :any){
    let best=100000000 ;

    for(let seq of seqList){
      if(seq.coutVersleSuivant<best){
        best=seq.coutVersleSuivant;
      }
    }
    return best;
  }
}
