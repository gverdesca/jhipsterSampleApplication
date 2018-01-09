package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ObiettiviInd.
 */
@Entity
@Table(name = "obiettivi_ind")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ObiettiviInd implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "dt_ini", nullable = false)
    private LocalDate dtIni;

    @NotNull
    @Column(name = "dt_fine", nullable = false)
    private LocalDate dtFine;

    @NotNull
    @Size(max = 1)
    @Column(name = "ti_segno", length = 1, nullable = false)
    private String tiSegno;

    @ManyToOne
    private Ind01Indic ind01Indic;

    @ManyToOne
    private Ind12Query ind12Query;

    @ManyToOne
    private Obiettivi obi00obiettivo;

    @OneToMany(mappedBy = "obi01ObiettiviIndic")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IndicValu> obi02IndicValuses = new HashSet<>();

    @OneToMany(mappedBy = "obi01ObiettiviIndic")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<IndicValIn> obi03IndicValuInters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDtIni() {
        return dtIni;
    }

    public ObiettiviInd dtIni(LocalDate dtIni) {
        this.dtIni = dtIni;
        return this;
    }

    public void setDtIni(LocalDate dtIni) {
        this.dtIni = dtIni;
    }

    public LocalDate getDtFine() {
        return dtFine;
    }

    public ObiettiviInd dtFine(LocalDate dtFine) {
        this.dtFine = dtFine;
        return this;
    }

    public void setDtFine(LocalDate dtFine) {
        this.dtFine = dtFine;
    }

    public String getTiSegno() {
        return tiSegno;
    }

    public ObiettiviInd tiSegno(String tiSegno) {
        this.tiSegno = tiSegno;
        return this;
    }

    public void setTiSegno(String tiSegno) {
        this.tiSegno = tiSegno;
    }

    public Ind01Indic getInd01Indic() {
        return ind01Indic;
    }

    public ObiettiviInd ind01Indic(Ind01Indic ind01Indic) {
        this.ind01Indic = ind01Indic;
        return this;
    }

    public void setInd01Indic(Ind01Indic ind01Indic) {
        this.ind01Indic = ind01Indic;
    }

    public Ind12Query getInd12Query() {
        return ind12Query;
    }

    public ObiettiviInd ind12Query(Ind12Query ind12Query) {
        this.ind12Query = ind12Query;
        return this;
    }

    public void setInd12Query(Ind12Query ind12Query) {
        this.ind12Query = ind12Query;
    }

    public Obiettivi getObi00obiettivo() {
        return obi00obiettivo;
    }

    public ObiettiviInd obi00obiettivo(Obiettivi obiettivi) {
        this.obi00obiettivo = obiettivi;
        return this;
    }

    public void setObi00obiettivo(Obiettivi obiettivi) {
        this.obi00obiettivo = obiettivi;
    }

    public Set<IndicValu> getObi02IndicValuses() {
        return obi02IndicValuses;
    }

    public ObiettiviInd obi02IndicValuses(Set<IndicValu> indicValus) {
        this.obi02IndicValuses = indicValus;
        return this;
    }

    public ObiettiviInd addObi02IndicValus(IndicValu indicValu) {
        this.obi02IndicValuses.add(indicValu);
        indicValu.setObi01ObiettiviIndic(this);
        return this;
    }

    public ObiettiviInd removeObi02IndicValus(IndicValu indicValu) {
        this.obi02IndicValuses.remove(indicValu);
        indicValu.setObi01ObiettiviIndic(null);
        return this;
    }

    public void setObi02IndicValuses(Set<IndicValu> indicValus) {
        this.obi02IndicValuses = indicValus;
    }

    public Set<IndicValIn> getObi03IndicValuInters() {
        return obi03IndicValuInters;
    }

    public ObiettiviInd obi03IndicValuInters(Set<IndicValIn> indicValIns) {
        this.obi03IndicValuInters = indicValIns;
        return this;
    }

    public ObiettiviInd addObi03IndicValuInters(IndicValIn indicValIn) {
        this.obi03IndicValuInters.add(indicValIn);
        indicValIn.setObi01ObiettiviIndic(this);
        return this;
    }

    public ObiettiviInd removeObi03IndicValuInters(IndicValIn indicValIn) {
        this.obi03IndicValuInters.remove(indicValIn);
        indicValIn.setObi01ObiettiviIndic(null);
        return this;
    }

    public void setObi03IndicValuInters(Set<IndicValIn> indicValIns) {
        this.obi03IndicValuInters = indicValIns;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ObiettiviInd obiettiviInd = (ObiettiviInd) o;
        if (obiettiviInd.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), obiettiviInd.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ObiettiviInd{" +
            "id=" + getId() +
            ", dtIni='" + getDtIni() + "'" +
            ", dtFine='" + getDtFine() + "'" +
            ", tiSegno='" + getTiSegno() + "'" +
            "}";
    }
}
