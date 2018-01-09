package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IndicValIn.
 */
@Entity
@Table(name = "indic_val_in")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IndicValIn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nd_val_inf", nullable = false)
    private Float ndValInf;

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

    public Float getNdValInf() {
        return ndValInf;
    }

    public IndicValIn ndValInf(Float ndValInf) {
        this.ndValInf = ndValInf;
        return this;
    }

    public void setNdValInf(Float ndValInf) {
        this.ndValInf = ndValInf;
    }

    public Float getNdValSup() {
        return ndValSup;
    }

    public IndicValIn ndValSup(Float ndValSup) {
        this.ndValSup = ndValSup;
        return this;
    }

    public void setNdValSup(Float ndValSup) {
        this.ndValSup = ndValSup;
    }

    public ObiettiviInd getObi01ObiettiviIndic() {
        return obi01ObiettiviIndic;
    }

    public IndicValIn obi01ObiettiviIndic(ObiettiviInd obiettiviInd) {
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
        IndicValIn indicValIn = (IndicValIn) o;
        if (indicValIn.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), indicValIn.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IndicValIn{" +
            "id=" + getId() +
            ", ndValInf=" + getNdValInf() +
            ", ndValSup=" + getNdValSup() +
            "}";
    }
}
