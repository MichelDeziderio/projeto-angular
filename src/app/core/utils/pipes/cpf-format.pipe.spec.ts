import { CpfFormatPipe } from './cpf-format.pipe';

describe('CpfFormatPipe', () => {
  let pipe: CpfFormatPipe;

  beforeEach(() => {
    pipe = new CpfFormatPipe();
  });

  it('should format a valid CPF string with only digits', () => {
    expect(pipe.transform('12345678901')).toBe('123.456.789-01');
  });

  it('should format a CPF string with dots and dashes', () => {
    expect(pipe.transform('123.456.789-01')).toBe('123.456.789-01');
  });

  it('should format a CPF string with spaces and other characters', () => {
    expect(pipe.transform(' 123 456 789 01 ')).toBe('123.456.789-01');
  });

  it('should return empty string for null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return empty string for undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return empty string for empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should not format if less than 11 digits', () => {
    expect(pipe.transform('1234567890')).toBe('1234567890');
  });

  it('should ignore non-digit characters and format if 11 digits remain', () => {
    expect(pipe.transform('abc123.456-789_01xyz')).toBe('123.456.789-01');
  });
});