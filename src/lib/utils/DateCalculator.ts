type DateInput = Date | string | number;
type FormatType = 'default' | 'iso' | 'full' | 'short' | 'custom';

interface DateFormats {
    default: string;
    iso: string;
    full: string;
    short: string;
    custom: string;
}

interface DateCalculationOptions {
    includeEndDate?: boolean;
    timezone?: string;
}

interface WorkingDaysOptions extends DateCalculationOptions {
    holidays?: DateInput[];
    workingDays?: number[]; // 0-6, 0 = Sunday
}

// Custom error class
class DateCalculationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DateCalculationError';
    }
}

// Main class
export class DateCalculator {
    // Convert any date input to Date object
    private static toDate(date: DateInput): Date {
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) {
                throw new DateCalculationError('Invalid date input');
            }
            return d;
        } catch (error: any) {
            throw new DateCalculationError(`Invalid date conversion: ${error.message}`);
        }
    }

    // Basic days difference
    static getDaysDifference(
        startDate: DateInput,
        endDate: DateInput,
        options: DateCalculationOptions = {}
    ): number {
        try {
            const start = this.toDate(startDate);
            const end = this.toDate(endDate);

            if (end < start) {
                throw new DateCalculationError('End date must be after start date');
            }

            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return options.includeEndDate ? diffDays + 1 : diffDays;
        } catch (error: any) {
            throw new DateCalculationError(`Error calculating days difference: ${error.message}`);
        }
    }

    // Calculate business days (excluding weekends)
    static getBusinessDays(
        startDate: DateInput,
        endDate: DateInput,
        options: DateCalculationOptions = {}
    ): number {
        try {
            let count = 0;
            const current = this.toDate(startDate);
            const end = this.toDate(endDate);

            while (current <= end) {
                const dayOfWeek = current.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    count++;
                }
                current.setDate(current.getDate() + 1);
            }

            return count;
        } catch (error: any) {
            throw new DateCalculationError(`Error calculating business days: ${error.message}`);
        }
    }

    // Calculate working days (excluding weekends and holidays)
    static getWorkingDays(
        startDate: DateInput,
        endDate: DateInput,
        options: WorkingDaysOptions = {}
    ): number {
        try {
            const {
                holidays = [],
                workingDays = [1, 2, 3, 4, 5], // Monday to Friday by default
                includeEndDate = false
            } = options;

            const holidayDates = holidays.map(h => this.toDate(h).toDateString());
            let count = 0;
            const current = this.toDate(startDate);
            const end = this.toDate(endDate);

            while (current <= end) {
                const dayOfWeek = current.getDay();
                const isWorkingDay = workingDays.includes(dayOfWeek);
                const isHoliday = holidayDates.includes(current.toDateString());

                if (isWorkingDay && !isHoliday) {
                    count++;
                }
                current.setDate(current.getDate() + 1);
            }

            return count;
        } catch (error: any) {
            throw new DateCalculationError(`Error calculating working days: ${error.message}`);
        }
    }

    // Format dates in different styles
    static formatDate(date: DateInput, format: FormatType = 'default'): string {
        try {
            const d = this.toDate(date);
            
            const formats: DateFormats = {
                default: d.toLocaleDateString(),
                iso: d.toISOString().split('T')[0],
                full: d.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                short: d.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                custom: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            };

            return formats[format] || formats.default;
        } catch (error: any) {
            throw new DateCalculationError(`Error formatting date: ${error.message}`);
        }
    }

    // Add or subtract days from a date
    static addDays(date: DateInput, days: number): string {
        try {
            const result = this.toDate(date);
            result.setDate(result.getDate() + days);
            return result.toISOString().split('T')[0];
        } catch (error: any) {
            throw new DateCalculationError(`Error adding days: ${error.message}`);
        }
    }

    // Check if a year is a leap year
    static isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Get the quarter of a date
    static getQuarter(date: DateInput): number {
        try {
            const month = this.toDate(date).getMonth();
            return Math.floor(month / 3) + 1;
        } catch (error: any) {
            throw new DateCalculationError(`Error calculating quarter: ${error.message}`);
        }
    }
}