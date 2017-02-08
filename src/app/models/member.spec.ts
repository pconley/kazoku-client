import { Member } from "./member"

describe('member.spec', () => {

    let member1 = {
        last: "conley", first: "patrick", sex: "m",
        birth: { month: 3, day: 1, year: 1955, location: "washington, d.c."},
        death: { month: 3, day: 1, year: 2027, location: "rochester, ny"}
    }

    it('should create a new member',() => {
        let fixture = new Member({})
        expect(fixture).toBeTruthy();
    });
    it('should include member values',() => {
        let params = {last: "conley",first: "patrick", dummy: "dummy"}
        let member = new Member(params)
        expect(member.last_name).toBe("conley");
        expect(member.first_name).toBe("patrick");
    });
    it('should include key and id values',() => {
        let params = {key: 'thekey', '$key': '33', last_name: "conley",first_name: "patrick", dummy: "dummy"}
        let member = new Member(params)
        expect(member.key).toBe("thekey");
        expect(member.id).toBe('33');
    });
    it('should construct the birth',() => {
        let birth = {day:1, year:1955, month:3}
        let member = new Member({ birth: birth })
        expect(member.birth).toBeDefined();
        expect(member.birth.kind).toBe("birth");
    });
    it('should construct the death',() => {
        let death = {day:1, year:2022, month:3}
        let member = new Member({ death: death })
        expect(member.death).toBeDefined();
        expect(member.death.kind).toBe("death");
    });
       it('should de-struct the birth',() => {
        let member = new Member(member1)
        expect(member.birth).toBeDefined();
        expect(member.birth.year).toBe(1955);
        expect(member.death).toBeDefined();
        expect(member.death.year).toBe(2027);
    });

});