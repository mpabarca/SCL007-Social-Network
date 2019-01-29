global.window=global;
global.assert=require('chai').assert;
require('../src/network.js');

describe('lol', () => {
    it('Debería ser un objeto', () => {
        window.assert.equal(typeof window.LOL, 'object');
      });

    describe('data.filterData',()=>{
        it('Debería ser una funcion',()=>{
            window.assert.equal(typeof window.data.filterData,'function');
        });
        it('Debería retornar el primer campeon de la categoría Fighter',()=>{
            let championFighter=window.data.filterData(Object.values(window.LOL.data),'Fighter')[0].name;
            window.assert.equal(championFighter,'Aatrox');
        });
        it('Debería retornar el decimo campeon de la categoría Tank ',()=>{
            let championTank=window.data.filterData(Object.values(window.LOL.data),'Tank')[9].name;
            window.assert.equal(championTank,'Galio');                        
        });
    });
    
    describe('data.sortData',()=>{
        it('Debería ser una funcion',()=>{
            window.assert.equal(typeof window.data.sortData,'function');
        });
        it('Debería retornar un array de los campeones ordenados por su id desde la A hasta la Z',()=>{
            let orderAZ= window.data.sortData(Object.values(window.LOL.data),'id','a-z');
            window.assert.equal(orderAZ[0].id,"Aatrox");
            window.assert.equal(orderAZ[1].id,"Ahri");
            window.assert.equal(orderAZ[2].id,"Akali");

        });
        it('Debería retornar un array de los campeones ordenados por su id desde la Z hasta la A',()=>{
            let orderZA= window.data.sortData(Object.values(window.LOL.data),'id','z-a');
            window.assert.equal(orderZA[0].id,"Zyra");
            window.assert.equal(orderZA[1].id,"Zilean");
            window.assert.equal(orderZA[2].id,"Ziggs");
        });
    });
    
    describe('data.findChampion',()=>{
        it('Debería ser una funcion',()=>{
            window.assert.equal(typeof window.data.findChampion,'function');
        });
        it('Debería retornar los tags del campeon con id=Akali',()=>{
            let tagsAkali=window.data.findChampion(Object.values(window.LOL.data),'Akali').tags;
            window.assert.equal(tagsAkali,"Assassin");
        });
        it('Debería retornar el titulo del campeon con id=Ahri',()=>{
            let tittleAhri=window.data.findChampion(Object.values(window.LOL.data),'Ahri').title;
            window.assert.equal(tittleAhri,"the Nine-Tailed Fox");            
        });
    });    
    
    describe('data.computeStats',()=>{
        it('Debería ser una funcion',()=>{
            window.assert.equal(typeof window.data.computeStats,'function');
        });
        it('Debería retornar el promedio de Attack de todos los campeones de la categoría Support',()=>{
            let averageSupport=window.data.computeStats(Object.values(window.LOL.data))[4][0];
            window.assert.equal(averageSupport,3.30);
        });
        it('Debería retornar el promedio de MP de todos los campeones de la categoría Mage ',()=>{
            let averageMage=window.data.computeStats(Object.values(window.LOL.data))[2][6];
            window.assert.equal(averageMage,3.55);            
        });
    })

});
