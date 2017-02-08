import { Event } from "./event"

describe('event model', () => {

    it('should create a new event',() => {
        let fixture = new Event({});
        expect(fixture).toBeTruthy();
    });
    it('should create a default event',() => {
        let event = new Event({});
        expect(event.day).toBe(0);
        expect(event.year).toBe(0);
        expect(event.month).toBe(0);
        expect(event.kind).toBe("error");
        expect(event.place).toBe(undefined);
    });
    it('should convert string values',() => {
        let event = new Event({day: "22", year: "1955", month: "4"});
        expect(event.day).toBe(22);
        expect(event.year).toBe(1955);
        expect(event.month).toBe(4);
        expect(event.kind).toBe("error");
        expect(event.place).toBe(undefined);
    });
    it('should accept numeric values',() => {
        let event = new Event({day: 22, year: 1955, month: 4});
        expect(event.day).toBe(22);
        expect(event.year).toBe(1955);
        expect(event.month).toBe(4);
        expect(event.kind).toBe("error");
        expect(event.place).toBe(undefined);
    });
    it('should accept any kind value',() => {
        let event = new Event({event: "anniversary"});
        expect(event.kind).toBe("anniversary");
        expect(event.place).toBe(undefined);
    });
    it('should accept any location value',() => {
        let event = new Event({place: "the moon"});
        expect(event.kind).toBe("error");
        expect(event.place).toBe("the moon");
    });
    it('should accept a date string',() => {
        let event = new Event({date_str: "around xmas"});
        expect(event.date_str).toBe("around xmas");
    });
    it('should create a display string',() => {
        let event = new Event({day: 22, year: 1955, month: 4, place: "the moon"});
        expect(event.kind).toBe("error");
        expect(event.as_date_string()).toBe('4/22/1955 the moon');
    }); 
});