package com.pistachio.main;
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
    public void setStats(List<Object> stats) {this.stats = stats;}
    
    //-[Constructors]----------------------------------------------------------

    /**
     * Constructor for a standard monster (From the monster base information table)
     * @param baseID
     * @param monsterName
     * @param nickname
     * @param moves
     * @param stats
     */
    public Monster(String baseID, String monsterName, List<Object> moves, List<Object> stats) {this(baseID,baseID,monsterName,monsterName,moves,stats);}
    
    /**
     * Constructor for a personal monster (from the monster specific information table)
     * @param monsterID
     * @param baseID
     * @param monsterName
     * @param nickname
     * @param moves
     * @param stats
     */
    public Monster(String monsterID, String baseID, String monsterName, String nickname, List<Object> moves, List<Object> stats){
        this.monsterID = monsterID;
        this.baseID = baseID;
        this.monsterName = monsterName;
        this.nickname = nickname;
        this.moves = moves;
        this.stats = stats;
    }

    //-[Methods]---------------------------------------------------------------

    /**
     * Add move to movelist. This monster must know less than 4 moves in order for this method to work. Monster must not alreayd have move M
     * @param m Move to add
     */
    public void AddMove(Object m) {
    	if(moves.size()>=4) {throw new IllegalStateException("Monster has all 4 moves set. You must replace a move instead.");}
    	if(moves.contains(m)) {throw new IllegalArgumentException("Monster already has this move. Add another one.");}
    	moves.add(m);
    }

    /**
     * Replace move in movelist. Monster must not already have move M
     * @param m
     * @param Index
     */
    public void ReplaceMove(Object m, int i) {
    	//check that there is a move at index i
    	if(i>=moves.size()) {throw new IllegalArgumentException("No move to replace at index " + i);}
    	if(moves.contains(m)) {throw new IllegalArgumentException("Monster already has this move. Add another one.");}
    	moves.set(i, m);
    }

   //Change stats 
    //This can be done with set, at least until we flesh out stats and potentially make another object.
    

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