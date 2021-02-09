import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface Cat {
  _id?: string,
  name: string,
  sex: string,
  breed: string,
  colour: string,
  date: Date,
  comment: string,
  photos: any[],
  price: {
    fav?: {
      uah: number,
      usd: number
    },
    breeding?: {
      uah: number,
      usd: number
    }
  }
}

interface Litter {
  _id?: string,
  mother: Cat,
  father: Cat,
  date: Date,
  kittens: Cat[]
}

interface Progress {
  _id?: string,
  photo: any,
  title: string,
  description: string,
  name: string,
  adjudicators: string[]
}

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})

export class PetsComponent {

  cats: Cat[];
  catsCollection: any;

  sex: [];
  ruCollection: any;

  constructor(
    public db: AngularFirestore,
    public cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getPets();
    this.getSex();

  }

  getSex() {
    this.ruCollection = this.db.collection<any>('ru');
    const ruData = this.ruCollection.valueChanges();

    ruData.subscribe(res => {
      this.sex = res[0].values;
      this.cdr.detectChanges();
    });
  }


  getPets() {
    this.catsCollection = this.db.collection<any>('cats');
    const catsData = this.catsCollection.valueChanges();

    catsData.subscribe(res => {
      this.cats = res;
      this.cdr.detectChanges();
    });
  }

  save(cat) {
    if (cat.date) {
      cat.date = new Date(cat.date).toISOString()
    }
    this.catsCollection.doc(cat.id).set(cat);
  }

  remove(cat) {
    this.catsCollection.doc(cat.id).delete()
  }

  addNew() {
    this.catsCollection.add({}).then((docRef) => {
      console.log("Document written with ID: ", docRef, docRef.id);
      const cat = { id: docRef.id };
      this.save(cat);

    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

}
