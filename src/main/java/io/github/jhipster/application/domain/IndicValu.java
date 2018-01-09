package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IndicValu.
 */
@Entity
@Table(name = "indic_valu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IndicValu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "ti_valu", nullable = false)
    private Float tiValu;

    @NotNull
    @Column(name = "ndal_inf", nullable = false)
    private Float ndalInf;

    @NotNull
    @Column(name = "nd_val_sup", nullable = false)
    private Float ndValSup;

    @ManyToOne
    private ObiettiviInd obi01ObiettiviIndic;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTiValu() {
        return tiValu;
    }

    public IndicValu tiValu(Float tiValu) {
        this.tiValu = tiValu;
        return this;
    }

    public void setTiValu(Float tiValu) {
        this.tiValu = tiValu;
    }

    public Float getNdalInf() {
        return ndalInf;
    }

    public IndicValu ndalInf(Float ndalInf) {
        this.ndalInf = ndalInf;
        return this;
    }

    public void setNdalInf(Float ndalInf) {
        this.ndalInf = ndalInf;
    }

    public Float getNdValSup() {
        return ndValSup;
    }

    public IndicValu ndValSup(Float ndValSup) {
        this.ndValSup = ndValSup;
        return this;
    }

    public void setNdValSup(Float ndValSup) {
        this.ndValSup = ndValSup;
    }

    public ObiettiviInd getObi01ObiettiviIndic() {
        return obi01ObiettiviIndic;
    }

    public IndicValu obi01ObiettiviIndic(ObiettiviInd obiettiviInd) {
        this.obi01ObiettiviIndic = obiettiviInd;
        return this;
    }

    public void setObi01ObiettiviIndic(ObiettiviInd obiettiviInd) {
        this.obi01ObiettiviIndic = obiettiviInd;
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
        IndicValu indicValu = (IndicValu) o;
        if (indicValu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), indicValu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IndicValu{" +
            "id=" + getId() +
            ", tiValu=" + getTiValu() +
            ", ndalInf=" + getNdalInf() +
            ", ndValSup=" + getNdValSup() +
            "}";
    }
}
