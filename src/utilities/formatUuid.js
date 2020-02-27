export const formatUuid = (uuid) => {

        const zeroth = uuid.slice(0,8);
        const first = uuid.slice(8,12);
        const second = uuid.slice(12,16);
        const third = uuid.slice(16,20);
        const fourth = uuid.slice(20,32);

        return zeroth + '-' + first + '-' + second + '-' + third + '-' + fourth
        //8-4-4-4-12

        //276890cca020423e96a8bf7d57e39076

        //276890cc-a020-423e-96a8-bf7d57e39076

        
}
