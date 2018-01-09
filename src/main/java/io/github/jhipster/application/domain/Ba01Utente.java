package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ba01Utente.
 */
@Entity
@Table(name = "ba_01_utente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ba01Utente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "nmnome", length = 100)
    private String nmnome;

    @Size(max = 100)
    @Column(name = "cdcod", length = 100)
    private String cdcod;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNmnome() {
        return nmnome;
    }

    public Ba01Utente nmnome(String nmnome) {
        this.nmnome = nmnome;
        return this;
    }

    public void setNmnome(String nmnome) {
        this.nmnome = nmnome;
    }

    public String getCdcod() {
        return cdcod;
    }

    public Ba01Utente cdcod(String cdcod) {
        this.cdcod = cdcod;
        return this;
    }

    public void setCdcod(String cdcod) {
        this.cdcod = cdcod;
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
        Ba01Utente ba01Utente = (Ba01Utente) o;
        if (ba01Utente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ba01Utente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ba01Utente{" +
            "id=" + getId() +
            ", nmnome='" + getNmnome() + "'" +
            ", cdcod='" + getCdcod() + "'" +
            "}";
    }
}
