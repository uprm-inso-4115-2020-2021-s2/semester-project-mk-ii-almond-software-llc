package com.pistachio.restservice.main;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

/**
 * Class that stores an instance of a monster along with their respect moveset and stats.
 * @author jose Bermudez Kevin B.
 */

public class Monster {

    @Id
    private String name;

    private Stats stats;

    private ArrayList<Move> moves;

    public Monster() 
    {
        this.name = "";
        this.stats = new Stats();
        this.moves = new ArrayList<Move>(3) ;
    }

    public Monster(String Name, Stats Stats, ArrayList<Move> Moves) 
    {
        this.name = Name;
        this.stats = Stats;
        this.moves = Moves;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the stats
     */
    public Stats getStats() {
        return stats;
    }

    /**
     * @param stats the stats to set
     */
    public void setStats(Stats stats) {
        this.stats = stats;
    }

    /**
     * @return the moves
     */
    public ArrayList<Move> getMoves() {
        return moves;
    }

    /**
     * @param moves the moves to set
     */
    public void setMoves(ArrayList<Move> moves) {
        this.moves = moves;
    }

    
    
}