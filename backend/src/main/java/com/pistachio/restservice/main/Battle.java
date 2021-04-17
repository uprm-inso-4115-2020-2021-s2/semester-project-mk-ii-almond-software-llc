package com.pistachio.restservice.main;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

/**
 * Class that stores an instance of a battle and a relation between the two players involved.
 * @author kevin purcell, Kevin B.
 */

public class Battle {
    
    //-[Fields]----------------------------------------------------------
    
    /**
     * Unique battle ID
     */
    @Id
    private String battleID;

    /**
     * First player's unique ID
     */
    private String firstPlayerID;

    /**
     * First player's team
     */
    private List<Monster> firstPlayerTeam;

    /**
     * Second player's unique ID
     */
    private String secondPlayerID;

    /**
     * Second player's team
     */
    private List<Monster> secondPlayerTeam;

    private Monster activeMonsterPlayer1;

    private Monster activeMonsterPlayer2;

    private int player1Teamsize;
    private int player2Teamsize;


    //-[Getters/Setters]--------------------------------------------------

    public String getBattleID() {return battleID;}
    public String getFirstPlayerID() {return firstPlayerID;}
    public List<Monster> getFirstPlayerTeam() {return firstPlayerTeam;}
    public String getSecondPlayerID() {return secondPlayerID;}
    public List<Monster> getSecondPlayerTeam() {return secondPlayerTeam;}
    public Monster getActiveMonster1() {return activeMonsterPlayer1;}
    public Monster getActiveMonster2() {return activeMonsterPlayer2;}
    public int getPlayer1TeamSize() {return player1Teamsize;}
    public int getPlayer2TeamSize() {return player2Teamsize;}

    public void setBattleID(String battleID) {this.battleID = battleID;}
    public void setFirstPlayerID(String firstPlayerID) {this.firstPlayerID = firstPlayerID;}
    public void setFirstPlayerTeam(List<Monster> firstPlayerTeam) {this.firstPlayerTeam = firstPlayerTeam;}
    public void setSecondPlayerID(String secondPlayerID) {this.secondPlayerID = secondPlayerID;}
    public void setSecondPlayerTeam(List<Monster> secondPlayerTeam) {this.secondPlayerTeam = secondPlayerTeam;}
    public void setActiveMonster1(Monster monsterToSwitch) {this.activeMonsterPlayer1 = monsterToSwitch;}
    public void setActiveMonster2(Monster monsterToSwitch) {this.activeMonsterPlayer2 = monsterToSwitch;}
    public void setPlayer1TeamSize(int newSize) {this.player1Teamsize = newSize;}
    public void setPlayer2TeamSize(int newSize) {this.player2Teamsize = newSize;}

    //-[Constructors]----------------------------------------------------------

    public Battle(String battleID, String firstPlayerID, List<Monster> firstPlayerTeam, String secondPlayerID, List<Monster> secondPlayerTeam){
        this.battleID = battleID;
        this.firstPlayerID = firstPlayerID;
        this.firstPlayerTeam = firstPlayerTeam;
        setActiveMonster1(this.firstPlayerTeam.get(0));
        setPlayer1TeamSize(this.firstPlayerTeam.size());

        this.secondPlayerID = secondPlayerID;
        this.secondPlayerTeam = secondPlayerTeam;
        setActiveMonster2(this.secondPlayerTeam.get(0));
        setPlayer2TeamSize(this.secondPlayerTeam.size());
    }

    public Battle(){
        this.firstPlayerID = "";
        this.firstPlayerTeam = new ArrayList<Monster>();
        this.secondPlayerID = "";
        this.secondPlayerTeam = new ArrayList<Monster>();
    }

    //-[Methods]---------------------------------------------------------------

    /**
     * Compares this battle to an object. Returns true if and only if The object is a battle and they share battle IDs
     */
    @Override
	public boolean equals(Object obj) {
		if (this == obj) {return true;}
		if (!(obj instanceof Battle)) {return false;}
		Battle other = (Battle) obj;
		return battleID.equals(other.battleID);
	}
    
	@Override
	public String toString() {
		return "Battle [battleID=" + battleID + "]";
	}

    /**
     * @return the _ID
     */
    public String getId() {
        return battleID;
    }

    /**
     * @param _ID the _ID to set
     */
    public void set_ID(String Id) {
        this.battleID = Id;
    }


}
