import {Directive, HostListener, Inject} from '@angular/core';
import {CommonChatService} from "../chat-page/commonChat.service";
import {DOCUMENT} from "@angular/common";
import {ChatPageComponent} from "../chat-page/chat-page.component";

@Directive({
  selector: '[scroll-directive]',
})
export class ScrollDirective {
  @Inject(DOCUMENT) document;
  constructor(private newService: CommonChatService, private chatComponent: ChatPageComponent) { }

  @HostListener("scroll", ["$event"])
  onListenerTriggered(event: UIEvent): void {
    if (event.srcElement.scrollTop == 0) {
      document.getElementById("loading").style.visibility = "visible"
      this.newService.scrolling().subscribe( data =>{
        for (let i = data["msgs"].length-1; i >=0 ; i-- ) {
           this.chatComponent.Message.unshift(data["msgs"][i]);
         }
        document.getElementById("loading").style.visibility = "hidden"
        var x = document.getElementById("aaa"+ data["msgs"].length)
        console.log(x)
        // console.log(this.chatComponent.Message)
      })
    }
  }


}
