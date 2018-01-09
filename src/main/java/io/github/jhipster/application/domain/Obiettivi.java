package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Obiettivi.
 */
@Entity
@Table(name = "obiettivi")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Obiettivi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "cd_obi", length = 100)
    private String cdObi;

    @Size(max = 400)
    @Column(name = "dl_obi", length = 400)
    private String dlObi;

    @Size(max = 100)
    @Column(name = "dl_icona", length = 100)
    private String dlIcona;

    @ManyToOne
    private Ba01Utente ba01utente;

    @OneToMany(mappedBy = "obi00obiettivo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ObiettiviInd> obi01ObiettiviIndics = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCdObi() {
        return cdObi;
    }

    public Obiettivi cdObi(String cdObi) {
        this.cdObi = cdObi;
        return this;
    }

    public void setCdObi(String cdObi) {
        this.cdObi = cdObi;
    }

    public String getDlObi() {
        return dlObi;
    }

    public Obiettivi dlObi(String dlObi) {
        this.dlObi = dlObi;
        return this;
    }

    public void setDlObi(String dlObi) {
        this.dlObi = dlObi;
    }

    public String getDlIcona() {
        return dlIcona;
    }

    public Obiettivi dlIcona(String dlIcona) {
        this.dlIcona = dlIcona;
        return this;
    }

    public void setDlIcona(String dlIcona) {
        this.dlIcona = dlIcona;
    }

    public Ba01Utente getBa01utente() {
        return ba01utente;
    }

    public Obiettivi ba01utente(Ba01Utente ba01Utente) {
        this.ba01utente = ba01Utente;
        return this;
    }

    public void setBa01utente(Ba01Utente ba01Utente) {
        this.ba01utente = ba01Utente;
    }

    public Set<ObiettiviInd> getObi01ObiettiviIndics() {
        return obi01ObiettiviIndics;
    }

    public Obiettivi obi01ObiettiviIndics(Set<ObiettiviInd> obiettiviInds) {
        this.obi01ObiettiviIndics = obiettiviInds;
        return this;
    }

    public Obiettivi addObi01ObiettiviIndics(ObiettiviInd obiettiviInd) {
        this.obi01ObiettiviIndics.add(obiettiviInd);
        obiettiviInd.setObi00obiettivo(this);
        return this;
    }

    public Obiettivi removeObi01ObiettiviIndics(ObiettiviInd obiettiviInd) {
        this.obi01ObiettiviIndics.remove(obiettiviInd);
        obiettiviInd.setObi00obiettivo(null);
        return this;
    }

    public void setObi01ObiettiviIndics(Set<ObiettiviInd> obiettiviInds) {
        this.obi01ObiettiviIndics = obiettiviInds;
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
        Obiettivi obiettivi = (Obiettivi) o;
        if (obiettivi.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), obiettivi.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Obiettivi{" +
            "id=" + getId() +
            ", cdObi='" + getCdObi() + "'" +
            ", dlObi='" + getDlObi() + "'" +
            ", dlIcona='" + getDlIcona() + "'" +
            "}";
    }
}
