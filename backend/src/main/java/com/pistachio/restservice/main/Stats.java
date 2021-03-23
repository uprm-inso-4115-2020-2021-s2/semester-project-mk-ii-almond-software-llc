package com.pistachio.restservice.main;

public class Stats
{
    public int hp;
    public int maxHp;
    public int baseDmg;
    public int spd;
    
    public Stats()
    {
        this.hp = 1;
        this.maxHp = 1;
        this.baseDmg = 1;
        this.spd = 1;
    }


    public Stats(int hp, int maxHp, int baseDmg, int spd)
    {
        this.hp = hp;
        this.maxHp = maxHp;
        this.baseDmg = baseDmg;
        this.spd = spd;
    }

    public int getHp(){return hp;}

    public void setHp(int hp){this.hp = hp;}

    public int getMaxHp(){return maxHp;}

    public void setMaxHp(int maxHp){this.maxHp = maxHp;}

    public int getBaseDmg() {return baseDmg;}

    public void setBaseDmg(int baseDmg){this.baseDmg = baseDmg;}

    public int getSpd(){return spd;}

    public void setSpd(int spd){this.spd = spd;}
  
    
}
