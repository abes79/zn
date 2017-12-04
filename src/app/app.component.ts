import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Zn';
    testText: string = 'test';
    connectType: number = 1;
    sqlQuerySelect: string = "SELECT id, name, email FROM testowa";
    sqlQueryInsert: string = "INSERT INTO `testowa` (`name`,`email`) VALUES ('Lider','brak')";
    dataAray: any = [];

    constructor(private _http: HttpClient) {

    }

    selectSql() {
        let toPost: string = '{ "sqlRequest" : "0", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = 'http://192.168.0.150/db_sql.php';
        this._http.post(_url, jsonPost
        ).subscribe((data) => {this.dataAray = data;
            console.log(data)
          }
        )
    }

    insertSql() {
        let toPost: string = '{ "sqlRequest" : "1", "sqlQuery" : "' + this.sqlQueryInsert + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = 'http://192.168.0.150/db_sql.php';
        this._http.post(_url, jsonPost
        ).subscribe((data) => {this.dataAray = data; 
            console.log(data)
          }
        )
    }

}
