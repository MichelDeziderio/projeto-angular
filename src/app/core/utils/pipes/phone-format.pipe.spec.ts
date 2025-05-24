import { PhoneFormatPipe } from "./phone-format.pipe";

describe('PhoneFormatPipe', () => {
  let pipe: PhoneFormatPipe;

  beforeEach(() => {
    pipe = new PhoneFormatPipe();
  });

  it('should format 10-digit phone numbers', () => {
    expect(pipe.transform('1198765432')).toBe('(11) 9876-5432');
    expect(pipe.transform('(11)98765432')).toBe('(11) 9876-5432');
    expect(pipe.transform('11-9876-5432')).toBe('(11) 9876-5432');
  });

  it('should format 11-digit phone numbers', () => {
    expect(pipe.transform('11998765432')).toBe('(11) 99876-5432');
    expect(pipe.transform('(11)99876-5432')).toBe('(11) 99876-5432');
    expect(pipe.transform('11-99876-5432')).toBe('(11) 99876-5432');
  });

  it('should return empty string for null, undefined, or empty input', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should handle input with non-digit characters', () => {
    expect(pipe.transform('11a99876b5432')).toBe('(11) 99876-5432');
    expect(pipe.transform('11 9876 5432')).toBe('(11) 9876-5432');
  });

  it('should return input as is if not enough digits', () => {
    expect(pipe.transform('1')).toBe('1');
    expect(pipe.transform('12')).toBe('12');
    expect(pipe.transform('123')).toBe('123');
    expect(pipe.transform('1234')).toBe('1234');
    expect(pipe.transform('12345')).toBe('12345');
    expect(pipe.transform('123456')).toBe('123456');
    expect(pipe.transform('1234567')).toBe('1234567');
    expect(pipe.transform('12345678')).toBe('12345678');
    expect(pipe.transform('123456789')).toBe('123456789');
  });

});