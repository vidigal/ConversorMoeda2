import {Component, OnInit} from '@angular/core';
import {ConverterMoedasService} from "./converter-moedas.service";

interface Moeda {
  sigla: string;
  descricao: string;
}

@Component({
  selector: 'app-converter-moedas',
  templateUrl: './converter-moedas.component.html',
  styleUrls: ['./converter-moedas.component.css']
})
export class ConverterMoedasComponent implements OnInit {

  moedas: Moeda[] = [];

  moedaOrigemSelecionada: string = '';
  moedaDestinoSelecionada: string = '';
  valorSelecionado: number = 0;

  valorConvertido: number = 0.0;
  taxaConversao: number = 0.0;
  exibirResultado: boolean = false;

  constructor(private converterMoedaService: ConverterMoedasService) {
  }

  ngOnInit(): void {
    this.converterMoedaService.listarSimbolos().subscribe(data => {
      for (let symbol in data.symbols) {
        let moeda: Moeda = {
          sigla: data.symbols[symbol].code,
          descricao: data.symbols[symbol].description
        }
        this.moedas.push(moeda);
      }
    });
  }

  calcularConversao() {
    this.converterMoedaService.converterMoeda(this.moedaOrigemSelecionada, this.moedaDestinoSelecionada, this.valorSelecionado).subscribe(data => {
        this.valorConvertido = data.result;
        this.taxaConversao = data.info.rate;
      });
    this.exibirResultado = true;
  }

  fecharResultado() {
    this.exibirResultado = false;
  }

}
