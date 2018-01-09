package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Ba00Entita.
 */
@Entity
@Table(name = "ba_00_entita")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ba00Entita implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "nm_nome", length = 100)
    private String nmNome;

    @NotNull
    @Size(max = 100)
    @Column(name = "cd_cod", length = 100, nullable = false)
    private String cdCod;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNmNome() {
        return nmNome;
    }

    public Ba00Entita nmNome(String nmNome) {
        this.nmNome = nmNome;
        return this;
    }

    public void setNmNome(String nmNome) {
        this.nmNome = nmNome;
    }

    public String getCdCod() {
        return cdCod;
    }

    public Ba00Entita cdCod(String cdCod) {
        this.cdCod = cdCod;
        return this;
    }

    public void setCdCod(String cdCod) {
        this.cdCod = cdCod;
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
        Ba00Entita ba00Entita = (Ba00Entita) o;
        if (ba00Entita.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ba00Entita.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ba00Entita{" +
            "id=" + getId() +
            ", nmNome='" + getNmNome() + "'" +
            ", cdCod='" + getCdCod() + "'" +
            "}";
    }
}
