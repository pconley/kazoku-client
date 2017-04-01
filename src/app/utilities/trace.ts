// we use a bit of an anti-pattern here to make it such that
// the trace functions are simple to code for the developer

export enum TraceLevel { Error, Warn, Log, Debug }

export const trace = {

    level: TraceLevel.Debug, // in development!

    set(level: TraceLevel){ this.level = level; },

    log(a1: any, ...rest: any[]) {
        if( this.level < TraceLevel.Log ) return; // no op
        const color = 'background: white;  color: gray';
        console.log('%c[KZ] '+a1,color,...rest);
    },

    debug(a1: any, ...rest: any[]) {
        if( this.level < TraceLevel.Log ) return; // no op
        const color = 'background: white;  color: black';
        console.log('%c[KZ] '+a1,color,...rest);
    },

    warn(a1: any, ...rest: any[]) {
        if( this.level < TraceLevel.Warn ) return; // no op
        const color = 'background: white;  color: red';
        console.warn('%c[KZ] '+a1,color,...rest);
    },

    error(a1: any, ...rest: any[]) {
        // currently, we cannot turn off the error level
        // also, we rely on the natural coloring of the error
        console.error('[KZ] '+a1,...rest);
    },

};