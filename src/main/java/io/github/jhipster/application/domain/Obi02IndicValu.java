package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Obi02IndicValu.
 */
@Entity
@Table(name = "obi_02_indic_valu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Obi02IndicValu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "tivalu", nullable = false)
    private Float tivalu;

    @NotNull
    @Column(name = "ndvalinf", nullable = false)
    private Float ndvalinf;

    @NotNull
    @Column(name = "ndvalsup", nullable = false)
    private Float ndvalsup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTivalu() {
        return tivalu;
    }

    public Obi02IndicValu tivalu(Float tivalu) {
        this.tivalu = tivalu;
        return this;
    }

    public void setTivalu(Float tivalu) {
        this.tivalu = tivalu;
    }

    public Float getNdvalinf() {
        return ndvalinf;
    }

    public Obi02IndicValu ndvalinf(Float ndvalinf) {
        this.ndvalinf = ndvalinf;
        return this;
    }

    public void setNdvalinf(Float ndvalinf) {
        this.ndvalinf = ndvalinf;
    }

    public Float getNdvalsup() {
        return ndvalsup;
    }

    public Obi02IndicValu ndvalsup(Float ndvalsup) {
        this.ndvalsup = ndvalsup;
        return this;
    }

    public void setNdvalsup(Float ndvalsup) {
        this.ndvalsup = ndvalsup;
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
        Obi02IndicValu obi02IndicValu = (Obi02IndicValu) o;
        if (obi02IndicValu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), obi02IndicValu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Obi02IndicValu{" +
            "id=" + getId() +
            ", tivalu=" + getTivalu() +
            ", ndvalinf=" + getNdvalinf() +
            ", ndvalsup=" + getNdvalsup() +
            "}";
    }
}
