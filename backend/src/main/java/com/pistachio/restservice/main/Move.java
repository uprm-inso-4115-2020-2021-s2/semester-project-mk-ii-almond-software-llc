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
    double accuracy;

    /**
     * Base critRate of the move.
     */
    double critRate;


    public Move() {
        this.name = "";
        this.baseDamage = 0;
        this.accuracy = 0.00;
        this.critRate = 0.00;
    }
    
    public Move(String name, int baseDamage, double accuracy, double critRate) {
        this.name = name;
        this.baseDamage = baseDamage;
        this.accuracy = accuracy;
        this.critRate = critRate;
    }

    //-[Getters/Setters]--------------------------------------------------

    public String getName(){return this.name;}
    public int getBaseDamage(){return this.baseDamage;}
    public double getAccuracy(){return this.accuracy;}
    public double getCritRate(){return this.critRate;}

    public void setName(String name){this.name = name;}
    public void setBaseDamage(int baseDamage){this.baseDamage = baseDamage;}
    public void setAccuracy(double accuracy){this.accuracy = accuracy;}
    public void setCritRate(double critRate){this.critRate = critRate;}

}