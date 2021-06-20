import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EkartService } from './ekart.service';
import { Book, bookInfo } from './book';
describe('Ekart Service', () => {
  let ekartService: EkartService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EkartService],
    });
    ekartService = TestBed.inject(EkartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('#service should created', () => {
    expect(ekartService).toBeTruthy();
  });

  it('Should call getBookInfo', () => {
    let result: Book = bookInfo;
    ekartService.getBookInfo('2').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}/2`,
    });

    req.flush(bookInfo);
    expect(result).toEqual(bookInfo);
  });

  it('Should call getBooks by search', () => {
    let result: Book[] = [];
    ekartService.getBooksBySearch('angular').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}?q=angular`,
    });
    req.flush({ items: [bookInfo] });
    expect(result).toEqual([bookInfo]);
  });

  it('Should return empty array if search string is empty', () => {
    let result: Book[] = [];
    ekartService.getBooksBySearch('').subscribe((data) => {
      result = data;
    });
    expect(result).toEqual([]);
  });
});
