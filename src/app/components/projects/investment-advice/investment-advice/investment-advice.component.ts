import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { OpenaiService } from '../../../../services/openai-service.service';

const POLYGON_API_KEY = '7gzuBoRfmIGczrEvwGY99tCtpf5frstA';

@Component({
  selector: 'app-investment-advice',
  imports: [CommonModule, FormsModule],
  templateUrl: './investment-advice.component.html',
  styleUrl: './investment-advice.component.css',
})
export class InvestmentAdviceComponent {
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  tickersArr: string[] = [];

  loading = false;
  apiMessage = '';
  reportGenerated = false;

  dates = {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  };

  report: string | null = '';

  constructor(private openaiService: OpenaiService) {}

  async onGenerateReportClicked() {
    console.log('Generating Report Clicked');

    this.fetchStockData();
  }

  onSubmitInput(input: string) {
    if (input.length > 2) {
      const newTickerStr = input;
      this.tickersArr.push(newTickerStr.toUpperCase());
      this.inputRef.nativeElement.value = '';
    } else {
      const label = document.getElementsByTagName('label')[0];
      label.style.color = 'red';
      label.textContent =
        'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.';
    }
  }

  async fetchStockData() {
    // Hide the action panel and show the loading panel
    this.loading = true;
    this.apiMessage = 'Querying Stocks API...';

    try {
      const stockData: string[] = await Promise.all(
        this.tickersArr.map(async (ticker) => {
          const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${this.dates.startDate}/${this.dates.endDate}?apiKey=${POLYGON_API_KEY}`;
          const response = await fetch(url);

          if (response.ok) {
            this.apiMessage = 'Creating report...';
            return response.text();
          } else {
            throw new Error(`Error fetching data for ticker: ${ticker}`);
          }
        })
      );

      this.fetchReport(stockData.join(''));
    } catch (err) {
      this.apiMessage = 'There was an error fetching stock data.';
      console.error('Error:', err);
    } finally {
    }
  }

  async fetchReport(data: string) {
    var messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are a experenced stock analyasist who is giving a client advice. based on the data tell them if they should buy or sell the given stocks. Keep your analysis to less than 150 words',
      },
      {
        role: 'user',
        content:
          'based on the provided data could you write me a short report on these provided stocks?',
      },
      {
        role: 'user',
        content: data,
      },
    ];

    var response = await this.openaiService.completeChat(messages);

    this.loading = false;
    this.reportGenerated = true;
    this.report = response;

    console.log(response);
  }
}
