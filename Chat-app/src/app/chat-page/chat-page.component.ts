import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {CommonChatService} from "./commonChat.service";
import {Router} from "@angular/router";
import {NgbDropdownConfig, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {DOCUMENT} from '@angular/common'


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit{
  @Inject(DOCUMENT) document;
  Users;
  User = [];
  token;
  message = "";
  Message = [];
  smiles = [
    "😀", "😂", "😃", "😅", "😇", "😉", "😊", "🙂", "🙃", "💋", "😋", "😍", "😘", "😗", "😚", "😜", "😝", "😛", "🤑", "🤓", "😎", "🤗", "😏", "😒", "🙄", "🤔", "😟", "😠", "😡", "😔", "😫", "😩", "😤", "😱", "😱", "😰", "😢", "😭", "🤐", "😷", "🤒", "🤕", "😴", "💩", "😈", "👍", "👎", "👏", "👌", "💪"
  ];
  animals = [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐯", "🦁", "🐮", "🐷", "🐸", "🙈", "🙉", "🙊", "🐣", "🐥", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🐌", "🐞", "🐜", "🕷", "🦂", "🦀", "🐍", "🐢", "🐠", "🐟", "🐬", "🐳", "🐊", "🐘", "🕊", "🐿", "🎄", "🌳", "🌴", "🌺", "🌻", "🌸", "🦋", "☃", "🌞", "☔", "❄",
  ];
  foods = [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🥝", "🍑", "🍍", "🍅", "🥒", "🍆", "🌶", "🌽", "🍯", "🍞", "🧀", "🍗", "🍖", "🍳", "🍔", "🍟", "🌭", "🍕", "🍜", "🍲", "🍱", "🍧", "🍦", "🍰", "🎂", "🍭", "🍫", "🍩", "🍺", "🍷", "🍸", "🍹", "🍾", "☕", "🍽", "🥐", "🥗", "🥕", "🥪", "🍿"
  ];
  proffesion = [
    "👩🏻‍🎓", "👨🏻‍🎓", "👲🏻", "👷🏻", "👸🏻", "🎅🏻", "👮🏻", "💂🏻", "💇🏻", "💃", "🏃", "👨🏻‍🏫", "👨🏻‍🌾", "👨🏻‍🍳", "👩🏻‍🍳", "👨🏻‍🔧", "👩🏻‍🔧", "👨🏼‍🏭", "👩🏼‍🏭", "👨🏻‍🔬", "👩🏼‍🔬", "👨🏻‍💻", "👩🏻‍💻", "👨🏻‍🎤", "👩🏻‍🎤", "👨🏻‍🎨", "👩🏻‍🎨", "👨🏻‍✈️", "👩🏻‍✈️", "👨🏻‍🚀", "👩🏻‍🚀", "👨🏻‍🚒", "👩🏻‍🚒", "👮🏻‍️", "👮🏻‍️", "🕵🏻", "🕵🏻‍️", "👷🏻‍️", "💇🏻‍️", "🤶🏼", "👨🏻‍⚖️", "👩🏼‍⚖️", "💂🏻‍️", "🤵🏻", "🤰🏼", "💆🏽", "💆🏻‍️", "🕺🏻", "🏃🏼‍️", "👰🏻", "🤡"
  ];
  sports = [
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "⛳", "🏌", "🏓", "🏸", "🏒", "🏑", "🏏", "🎿", "⛷", "🏂", "⛸", "🏹", "🎣", "🚣", "🏊", "🏄", "⛹", "🏋", "🚴", "🚵", "🏇", "🕴", "🏆", "🎽", "🏅", "🎖", "🎭", "🎨", "🎪", "🎲", "🎰", "🎳", "🎹", "🎷", "🎺", "🎸", "🎻", "🎤", "🎧", "🎯", "🎮", "🤹‍", "🤾‍"
  ];

  constructor(private tabs: NgbTabsetConfig, private config: NgbDropdownConfig, private newService: CommonChatService, private router: Router) {
    config.autoClose = false;
    tabs.justify = "center";

    this.newService.messageRes().subscribe(data => {
      this.Message.push(data)
    })

    // this.newService.setOffline().subscribe(data => {
    //   console.log(data ," ++++++++-----------****************////////////////")
    // })
  }


  ngOnInit() {

    this.newService.GetData().subscribe(data => {
      this.Users = data["users"];
      this.User.push(data["user"]);
      this.Message = data["messages"];
      console.log(this.Users)
      this.newService.userConnected({userId: this.User[0]._id});


    }, error => {
      if (error.status == 400) {
        console.log(error)
        localStorage.removeItem("Authorization");
        this.router.navigate(['/login'])
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    var promise = new Promise((resolve, reject)=>{
      this.newService.destroy({userId: this.User[0]._id}).subscribe(data =>{
       resolve(data);
      })
    }).then((data)=>{
      this.router.navigate(['/chat'])
      console.log(data)
    })

  }

  logOut() {
    console.log("1111111111111111111111111")
    this.newService.userDisconected({userId: this.User[0]._id})
    console.log("222222222222222222222222222222")
    localStorage.removeItem("Authorization");
    this.router.navigate(['/login'])

  }

  send() {
    if (this.message == "") return;
    this.newService.sendMessage({message: this.message, user: this.User[0]._id, avatar: this.User[0].avatar});
    this.message = "";
  }

  take(event) {
    this.message += event.target.innerHTML;
  }

}
