package com.pistachio.main;

import java.util.ArrayList;
import java.util.List;

/**
 * Class that stores an instance of a monster along with their respect moveset and stats.
 * @author jose Bermudez
 */

public class Monster {
    
    //-[Fields]----------------------------------------------------------
    
    /**
     * Unique monster ID
     */
    private String monsterID;

    /**
     * Monster's base ID.
     */
    private String baseID;

    /**
     * Monster's name.
     */
    private String monsterName; 
 /**
     * Monster's name assigned by the player.
     */
    private String nickname;

    /**
     * List of monsters stats
     */
    private List<Object> stats; //TODO: Switch to Stats object upon creation

    /**
     * List of monsters available moves.
     */
    private List<Object> moves; //TODO: Switch to Moves object upon creation

    /**
     * List of actions taken during the battle.
     */
    private List<String> teamID; 

    //-[Getters/Setters]--------------------------------------------------
    public String getMonsterID()   {return monsterID;}
    public String getBaseID()  {return baseID;}
    public String getMonsterName()    {return monsterName;}
    public String getNickname()    {return nickname;}
    public List<Object> getMoves()   {return moves;}
    public List<Object> getStats()   {return stats;}

    public void setMonsterID(String monsdterID)  {this.monsterID = monsdterID;}
    public void setBaseID(String baseID) {this.baseID = baseID;}
    public void setMonsterName(String monsterName)   {this.monsterName = monsterName;}
    public void setNickname(String nickname) {this.nickname = nickname;}
    public void setMoves(List<Object> moves) {this.moves = moves;}
    public void setstats(List<Stats> stats) {this.stats = stats;}

    //-[Constructors]----------------------------------------------------------

    public Monster(String monsterID, String baseID, String monsterName, String nickname, List<Object> moves, List<Object> stats){
        this.monsterID = monsterID;
        this.baseID = baseID;
        this.monsterName = monsterName;
        this.nickname = nickname;
        this.moves = moves;
        this.stats = stats;
        this.actionLog = new List<String>();
    }

    //-[Methods]---------------------------------------------------------------

   // Change Nickname

   //Add move to movelist

   //Replace move in movelist

   //Change stats

   /**
     * Compares selected monster with another. Returns true if and only if the other object is a monster and their monster IDis the same as this one's
     */
   @Override
   public boolean equals(Object obj) {
       if (this == obj) {return true;}
       if (!(obj instanceof Monster)) {return false;}
       Monster other = (Monster) obj;
       return monsterID.equals(other.monsterID);
   }
    @Override
	public String toString() {return "Monster [monsterName=" + monsterName + "]";}

}