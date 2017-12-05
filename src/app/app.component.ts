import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title: string = 'Zn';
    //sqlQuerySelect: string = "SELECT * FROM testowa LIMIT 0, 5";
    sqlQuerySelect: string = "SELECT * FROM testowa";
    sqlQueryInsert: string = "INSERT INTO `testowa` (`name`,`email`) VALUES ('Lider','brak')";
    dataAray: any = [];

    constructor(private _http: HttpClient) {

    }

    selectSql() {
        let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
        this._http.post(_url, jsonPost
        ).subscribe((data) => {this.dataAray = data;
            console.log(data)
          }
        )
    }

    insertSql() {
        let toPost: string = '{ "sqlRequest" : "11", "sqlQuery" : "' + this.sqlQueryInsert + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
        this._http.post(_url, jsonPost
        ).subscribe((data) => {this.dataAray = data; 
            console.log(data)
          }
        )
    }

}
