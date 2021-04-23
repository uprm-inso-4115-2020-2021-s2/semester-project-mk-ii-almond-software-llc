package com.pistachio.restservice.main;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

/**
 * Class that stores an instance of a battle and a relation between the two
 * players involved.
 * 
 * @author kevin purcell, Kevin B.
 */

public class Battle {

    // -[Fields]----------------------------------------------------------

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

    private String victor;
    private Monster activeMonsterPlayer1;

    private Monster activeMonsterPlayer2;

    private int player1Teamsize;
    private int player2Teamsize;

    private String player1Action = "";
    private String player2Action = "";

    // -[Getters/Setters]--------------------------------------------------

    public String getBattleID() {
        return battleID;
    }

    public String getFirstPlayerID() {
        return firstPlayerID;
    }

    public List<Monster> getFirstPlayerTeam() {
        return firstPlayerTeam;
    }

    public String getSecondPlayerID() {
        return secondPlayerID;
    }

    public List<Monster> getSecondPlayerTeam() {
        return secondPlayerTeam;
    }

    public String getVictor() {
        return victor;
    }

    public Monster getActiveMonster1() {
        return activeMonsterPlayer1;
    }

    public Monster getActiveMonster2() {
        return activeMonsterPlayer2;
    }

    public int getPlayer1TeamSize() {
        return player1Teamsize;
    }

    public int getPlayer2TeamSize() {
        return player2Teamsize;
    }

    public String getPlayer1Action() {
        return player1Action;
    }

    public String getPlayer2Action() {
        return player2Action;
    }

    public void setBattleID(String battleID) {
        this.battleID = battleID;
    }

    public void setFirstPlayerID(String firstPlayerID) {
        this.firstPlayerID = firstPlayerID;
    }

    public void setFirstPlayerTeam(List<Monster> firstPlayerTeam) {
        this.firstPlayerTeam = firstPlayerTeam;
    }

    public void setSecondPlayerID(String secondPlayerID) {
        this.secondPlayerID = secondPlayerID;
    }

    public void setSecondPlayerTeam(List<Monster> secondPlayerTeam) {
        this.secondPlayerTeam = secondPlayerTeam;
    }

    public void setVictor(String winnerUsername) {
        this.victor = winnerUsername;
    }

    public void setActiveMonster1(Monster monsterToSwitch) {
        this.activeMonsterPlayer1 = monsterToSwitch;
    }

    public void setActiveMonster2(Monster monsterToSwitch) {
        this.activeMonsterPlayer2 = monsterToSwitch;
    }

    public void setPlayer1TeamSize(int newSize) {
        this.player1Teamsize = newSize;
    }

    public void setPlayer2TeamSize(int newSize) {
        this.player2Teamsize = newSize;
    }

    public void setPlayer1Action(String newAction) {
        this.player1Action = newAction;
    }

    public void setPlayer2Action(String newAction) {
        this.player2Action = newAction;
    }

    // -[Constructors]----------------------------------------------------------

    public Battle(String battleID, String firstPlayerID, List<Monster> firstPlayerTeam, String secondPlayerID,
            List<Monster> secondPlayerTeam) {
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

    public Battle() {
        this.firstPlayerID = "";
        this.firstPlayerTeam = new ArrayList<Monster>();
        this.secondPlayerID = "";
        this.secondPlayerTeam = new ArrayList<Monster>();
    }

    // -[Methods]---------------------------------------------------------------

    /**
     * Compares this battle to an object. Returns true if and only if The object is
     * a battle and they share battle IDs
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Battle)) {
            return false;
        }
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

    public void calculateTurnOutcome() {
        //check that both players have actions
        if(player1Action != "" && player2Action != "")
        {
            //Check if player1 is swaping out monster
            if(player1Action.startsWith("1"))
            {
                //change active monster
                setActiveMonster1(firstPlayerTeam.get(Character.getNumericValue(player1Action.charAt(1))));
                
                //Player 2 will also change monster
                if(player2Action.startsWith("1")){
                    setActiveMonster2(firstPlayerTeam.get(Character.getNumericValue(player2Action.charAt(1))));
                }
                //Player 2 will attack instead
                else{
                    calculateDamage(Character.getNumericValue(player2Action.charAt(1)), activeMonsterPlayer2, activeMonsterPlayer1);
                    setPlayer1Action("");
                    setPlayer2Action("");
                }
            }
            else if(player2Action.startsWith("1"))
            {
                //change active monster
                setActiveMonster2(firstPlayerTeam.get(Character.getNumericValue(player2Action.charAt(1))));
                
                //Player 1 will now attack
                
                calculateDamage(Character.getNumericValue(player1Action.charAt(1)), activeMonsterPlayer1, activeMonsterPlayer2);
                setPlayer1Action("");
                setPlayer2Action("");
            }
            //Player skipping
            else if(player1Action.startsWith("2")){

                //player 2 will swap
                setActiveMonster2(firstPlayerTeam.get(Character.getNumericValue(player2Action.charAt(1))));
            }
            else if(player2Action.startsWith("2")){
                //player 1 will swap
                setActiveMonster1(firstPlayerTeam.get(Character.getNumericValue(player1Action.charAt(1))));
            }

            //both of them are attacking
            else
            {
                calculateDamage(Character.getNumericValue(player1Action.charAt(1)), Character.getNumericValue(player2Action.charAt(1)));
                setPlayer1Action("");
                setPlayer2Action("");
            }
        }
    }

    public void calculateDamage(int moveIndexPlayer1, int moveIndexPlayer2) {

        Move player1move = activeMonsterPlayer1.getMoves().get(moveIndexPlayer1);
        Move player2move = activeMonsterPlayer2.getMoves().get(moveIndexPlayer2);

        double damageThatMonster1DoesToMonster2 = (player1move.getBaseDamage()) * player1move.getCritRate();
        double damageThatMonster2DoesToMonster1 = (player2move.getBaseDamage()) * player2move.getCritRate();

        // Figure out order to do the damage

        if (activeMonsterPlayer1.getStats().getSpd() < activeMonsterPlayer2.getStats().getSpd()) {
            applyDamage(damageThatMonster2DoesToMonster1, activeMonsterPlayer1);
            if (!checkDeath(activeMonsterPlayer1)) {
                applyDamage(damageThatMonster1DoesToMonster2, activeMonsterPlayer2);
            }
        } else {
            applyDamage(damageThatMonster1DoesToMonster2, activeMonsterPlayer2);
            if (!checkDeath(activeMonsterPlayer2)) {
                applyDamage(damageThatMonster2DoesToMonster1, activeMonsterPlayer1);
            }
        }
    }

    public void calculateDamage(int moveIndex, Monster attackingMonster, Monster recievingMonster) {

        Move moveToUse = attackingMonster.getMoves().get(moveIndex);

        double damageThatAttackerDoesToDefender = (moveToUse.getBaseDamage()) * moveToUse.getCritRate();

        applyDamage(damageThatAttackerDoesToDefender, recievingMonster);
    }

    public void applyDamage(double damage, Monster punchingBag) {
        punchingBag.getStats().setHp(punchingBag.getStats().getHp() - (int) damage);
    }

    public boolean checkDeath(Monster victim) {
        return victim.getStats().getHp() < 0;
    }
}
