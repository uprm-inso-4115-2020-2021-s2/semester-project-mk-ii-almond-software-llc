package com.pistachio.restservice.main;

/**
 * Class representing a given Move and it's stats.
 * @author kevin purcell
 */

public class Move {

    //-[Fields]----------------------------------------------------------

    /**
     * Name of the move.
     */
    String name;

    /**
     * Base damage of the move.
     */
    int baseDamage;

    /**
     * Accuracy of the move.
     */
    int accuracy;

    /**
     * Base critRate of the move.
     */
    double critRate;

    //-[Getters/Setters]--------------------------------------------------

    public String getName(){return this.name;}
    public int getBaseDamage(){return this.baseDamage;}
    public int getAccuracy(){return this.accuracy;}
    public double getCritRate(){return this.critRate;}

    public void setName(String name){this.name = name;}
    public void setBaseDamage(int baseDamage){this.baseDamage = baseDamage;}
    public void setAccuracy(int accuracy){this.accuracy = accuracy;}
    public void setCritRate(double critRate){this.critRate = critRate;}



    
}
