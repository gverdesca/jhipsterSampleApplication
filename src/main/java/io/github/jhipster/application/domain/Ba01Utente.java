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
    @Column(name = "nm_nome", length = 100)
    private String nmNome;

    @Size(max = 100)
    @Column(name = "cd_cod", length = 100)
    private String cdCod;

    @ManyToOne
    private Ba00Entita userEntity;

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

    public Ba01Utente nmNome(String nmNome) {
        this.nmNome = nmNome;
        return this;
    }

    public void setNmNome(String nmNome) {
        this.nmNome = nmNome;
    }

    public String getCdCod() {
        return cdCod;
    }

    public Ba01Utente cdCod(String cdCod) {
        this.cdCod = cdCod;
        return this;
    }

    public void setCdCod(String cdCod) {
        this.cdCod = cdCod;
    }

    public Ba00Entita getUserEntity() {
        return userEntity;
    }

    public Ba01Utente userEntity(Ba00Entita ba00Entita) {
        this.userEntity = ba00Entita;
        return this;
    }

    public void setUserEntity(Ba00Entita ba00Entita) {
        this.userEntity = ba00Entita;
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
            ", nmNome='" + getNmNome() + "'" +
            ", cdCod='" + getCdCod() + "'" +
            "}";
    }
}
